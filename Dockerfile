FROM node:lts as build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

COPY . /usr/src/app/

# Install corepack to allow usage of other package managers
RUN corepack enable

# Removing unnecessary files for us
RUN find . -mindepth 1 -maxdepth 1 -name '.*' ! -name '.' ! -name '..' -exec bash -c 'echo "Deleting {}"; rm -rf {}' \;

# Prepage package.json
RUN cp /usr/src/app/install/package.json /usr/src/app/

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive \
    apt-get -y --no-install-recommends install \
        tini

RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# Copy plugin
COPY nodebb-plugin-mailgun-delivery /usr/src/app/nodebb-plugin-mailgun-delivery

# Link plugin + install its deps
WORKDIR /usr/src/app/nodebb-plugin-mailgun-delivery
RUN npm install --omit=dev && npm link

WORKDIR /usr/src/app
RUN npm link nodebb-plugin-mailgun-delivery \
    && npm install dotenv mailgun.js form-data --omit=dev \
    && npm install --omit=dev \
    && rm -rf .npm

# # Install plugin deps explicitly
# RUN npm install ./nodebb-plugin-mailgun-delivery --omit=dev

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

# Copy entrypoint and tini
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/setup.json /usr/src/app/install/docker/setup.json
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=build --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini

# Copy app source but do NOT overwrite node_modules
COPY --from=build --chown=${USER}:${USER} /usr/src/app/package*.json /usr/src/app/
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/ /usr/src/app/install/
COPY --from=build --chown=${USER}:${USER} /usr/src/app/src/ /usr/src/app/src/
COPY --from=build --chown=${USER}:${USER} /usr/src/app/public/ /usr/src/app/public/
COPY --from=build --chown=${USER}:${USER} /usr/src/app/nodebb-plugin-mailgun-delivery/ /usr/src/app/nodebb-plugin-mailgun-delivery/
COPY --from=build --chown=${USER}:${USER} /usr/src/app/config.json /usr/src/app/config.json

# Copy node_modules separately so they’re preserved
COPY --from=build --chown=${USER}:${USER} /usr/src/app/node_modules /usr/src/app/node_modules

RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Protect critical paths
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
