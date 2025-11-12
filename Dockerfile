# ---------- Build Stage ----------
FROM node:lts AS build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

# Copy package manifests first for caching
COPY package*.json ./

# Copy custom plugin early so npm can resolve "file:./nodebb-plugin-mailgun-delivery"
COPY nodebb-plugin-mailgun-delivery ./nodebb-plugin-mailgun-delivery

# Install corepack to allow usage of other package managers
RUN corepack enable

# Install tini
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install tini \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# Install all dependencies (root + plugin deps, including mailgun.js)
RUN npm install --omit=dev

# Copy source but don't overwrite package.json
COPY . /usr/src/app/
COPY package*.json /usr/src/app/

# Cleanup npm cache
RUN rm -rf .npm


# ---------- Final Runtime Stage ----------
FROM node:lts-slim AS final

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

# Enable corepack + create user
RUN corepack enable \
    && groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && mkdir -p /usr/src/app/logs/ /opt/config/ \
    && chown -R ${USER}:${USER} /usr/src/app/ /opt/config/

# Copy entrypoint and tini
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/setup.json /usr/src/app/install/docker/setup.json
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=build --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini

# Copy everything built (app + node_modules + plugin)
COPY --from=build --chown=${USER}:${USER} /usr/src/app/ /usr/src/app/

# Permissions
RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Protect critical paths
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]