FROM node:lts AS git

ENV USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

RUN apt-get update \
    && apt-get -y --no-install-recommends install tini

USER ${USER}

# Change to the git branch you want to test
RUN git clone --recurse-submodules -j8 --depth 1 https://github.com/NodeBB/NodeBB.git .

RUN find . -mindepth 1 -maxdepth 1 -name '.*' ! -name '.' ! -name '..' -exec bash -c 'echo "Deleting {}"; rm -rf {}' \;


FROM node:lts AS node_modules_touch

ENV NODE_ENV=development \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

RUN corepack enable \
  && groupadd --gid ${GID} ${USER} \
  && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
  && chown -R ${USER}:${USER} /usr/src/app/

COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/package.json /usr/src/app/

USER ${USER}

# Copy plugin
COPY nodebb-plugin-mailgun-delivery /usr/src/app/nodebb-plugin-mailgun-delivery

# Link plugin + install its deps
WORKDIR /usr/src/app/nodebb-plugin-mailgun-delivery
RUN npm install --omit=dev && npm link

WORKDIR /usr/src/app
RUN npm link nodebb-plugin-mailgun-delivery \
    && npm install --omit=dev \
    && rm -rf .npm


FROM node:lts-slim AS final

ENV NODE_ENV=development \
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
COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/docker/setup.json /usr/src/app/install/docker/setup.json
COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=git --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini

# Copy app code (but skip overwriting node_modules)
COPY --from=git --chown=${USER}:${USER} /usr/src/app/package*.json /usr/src/app/
COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/ /usr/src/app/install/
COPY --from=git --chown=${USER}:${USER} /usr/src/app/src/ /usr/src/app/src/
COPY --from=git --chown=${USER}:${USER} /usr/src/app/public/ /usr/src/app/public/
COPY --from=git --chown=${USER}:${USER} /usr/src/app/nodebb-plugin-mailgun-delivery/ /usr/src/app/nodebb-plugin-mailgun-delivery/
COPY --from=git --chown=${USER}:${USER} /usr/src/app/config.json /usr/src/app/config.json

# Copy node_modules built in node_modules_touch stage
COPY --from=node_modules_touch --chown=${USER}:${USER} /usr/src/app/node_modules /usr/src/app/node_modules

# Ensure runtime deps are available in dev container
RUN npm install dotenv mailgun.js form-data --omit=dev

RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Protect critical paths
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
