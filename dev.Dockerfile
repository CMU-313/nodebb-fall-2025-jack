# ---------- Git Stage ----------
FROM node:lts AS git

ENV USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

# Create nodebb user
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

# Install tini for setup scripts
RUN apt-get update \
    && apt-get -y --no-install-recommends install tini \
    && rm -rf /var/lib/apt/lists/*

USER ${USER}

# Clone NodeBB repo (adjust branch as needed)
RUN git clone --recurse-submodules -j8 --depth 1 https://github.com/NodeBB/NodeBB.git .

# Remove unnecessary hidden files
RUN find . -mindepth 1 -maxdepth 1 -name '.*' ! -name '.' ! -name '..' -exec bash -c 'echo "Deleting {}"; rm -rf {}' \;


# ---------- Dependencies Stage ----------
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

# Copy package.json (⚠️ should be the one with your plugin + mailgun.js)
COPY --from=git --chown=${USER}:${USER} /usr/src/app/package*.json /usr/src/app/

# Copy custom plugin early so npm can resolve "file:./nodebb-plugin-mailgun-delivery"
COPY nodebb-plugin-mailgun-delivery ./nodebb-plugin-mailgun-delivery

USER ${USER}

# Single install step: root deps + plugin deps (includes mailgun.js)
RUN npm install --omit=dev && rm -rf .npm


# ---------- Final Runtime Stage ----------
FROM node:lts-slim AS final

ENV NODE_ENV=development \
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
COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/docker/setup.json /usr/src/app/install/docker/setup.json
COPY --from=git --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=git --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini

# Copy repo code (NodeBB itself)
COPY --from=git --chown=${USER}:${USER} /usr/src/app/ /usr/src/app/

# Copy prepared node_modules (with plugin + mailgun.js)
COPY --from=node_modules_touch --chown=${USER}:${USER} /usr/src/app/node_modules /usr/src/app/node_modules

# Set permissions
RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

# Protect critical paths
VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
