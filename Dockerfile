# ---------- Build Stage ----------
FROM node:lts AS build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

WORKDIR /usr/src/app/

# 1️⃣ Copy entire repo (NodeBB + install scripts + plugin)
COPY . /usr/src/app/

# 2️⃣ Copy custom plugin early so npm can resolve "file:./nodebb-plugin-mailgun-delivery"
COPY nodebb-plugin-mailgun-delivery ./nodebb-plugin-mailgun-delivery

# 3️⃣ Enable corepack for modern package managers
RUN corepack enable

# 4️⃣ Remove unnecessary hidden files (e.g., .git, .vscode)
RUN find . -mindepth 1 -maxdepth 1 -name '.*' ! -name '.' ! -name '..' -exec bash -c 'echo "Deleting {}"; rm -rf {}' \;

# 5️⃣ Prepare NodeBB's package.json (as the original build expects)
RUN rm -f /usr/src/app/package.json && \
    cp /usr/src/app/install/package.json /usr/src/app/package.json

# 6️⃣ Install tini
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install tini \
    && rm -rf /var/lib/apt/lists/*

# 7️⃣ Create non-root user and fix permissions
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# 8️⃣ Install all dependencies (including plugin deps)
RUN npm install --no-audit --no-fund --omit=dev || npm install --package-lock=false --omit=dev \
 && npm install --no-audit --no-fund --omit=dev --prefix nodebb-plugin-mailgun-delivery || npm install --package-lock=false --omit=dev --prefix nodebb-plugin-mailgun-delivery \
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

# 9️⃣ Enable corepack and create user
RUN corepack enable \
    && groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && mkdir -p /usr/src/app/logs/ /opt/config/ \
    && chown -R ${USER}:${USER} /usr/src/app/ /opt/config/

# 🔟 Copy built app + plugin + entrypoint
COPY --from=build --chown=${USER}:${USER} /usr/src/app/ /usr/src/app/
COPY --from=build --chown=${USER}:${USER} /usr/bin/tini /usr/local/bin/tini
COPY --from=build --chown=${USER}:${USER} /usr/src/app/install/docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/tini

USER ${USER}

EXPOSE 4567

VOLUME ["/usr/src/app/node_modules", "/usr/src/app/build", "/usr/src/app/public/uploads", "/opt/config/"]

ENTRYPOINT ["tini", "--", "entrypoint.sh"]
