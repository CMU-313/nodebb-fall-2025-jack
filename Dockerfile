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

# Install corepack and tini
RUN corepack enable \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install tini \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# Install dependencies (includes plugins + Mailgun)
RUN npm install --omit=dev

# Copy source code
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

RUN corepack enable \
    && groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && mkdir -p /usr/src/app/logs/ /opt/config/ \
    && chown -R ${USER}:${USER} /usr/src/app/ /opt/config/

# Copy from build
COPY --from=build --chown=${USER}:${USER} /usr/src/app/ /usr/src/app/
COPY --from=build --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Keep volumes for persistence
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
