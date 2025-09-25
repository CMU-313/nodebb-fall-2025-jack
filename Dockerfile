# ---------- Build Stage ----------
FROM node:lts AS build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

# Copy source
COPY . /usr/src/app/

# Install corepack to allow usage of other package managers
RUN corepack enable

# Remove unnecessary hidden files
RUN find . -mindepth 1 -maxdepth 1 -name '.*' ! -name '.' ! -name '..' -exec bash -c 'echo "Deleting {}"; rm -rf {}' \;

# Prepare package.json
RUN cp /usr/src/app/install/package.json /usr/src/app/

# Install tini
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install tini \
    && rm -rf /var/lib/apt/lists/*

# Create user
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# Copy custom plugin
COPY nodebb-plugin-mailgun-delivery /usr/src/app/nodebb-plugin-mailgun-delivery

# Install plugin deps and link it
WORKDIR /usr/src/app/nodebb-plugin-mailgun-delivery
RUN npm install --omit=dev && npm link

# Back to app root
WORKDIR /usr/src/app

# Link plugin + install runtime deps + install rest
RUN npm link nodebb-plugin-mailgun-delivery \
    && npm install dotenv mailgun.js form-data --omit=dev \
    && npm install --omit=dev \
    && rm -rf .npm

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

# Copy the whole built app (including node_modules and plugin)
COPY --from=build --chown=${USER}:${USER} /usr/src/app/ /usr/src/app/

# Permissions
RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Protect critical paths
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
