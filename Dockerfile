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

# Install NodeBB dependencies + the default theme
RUN npm install --omit=dev \
    && npm install nodebb-theme-harmony --save \
    && npm install nodebb-theme-persona --save \
    && npm ls | grep nodebb-theme || true

# Copy source but don't overwrite package.json
COPY . /usr/src/app/
COPY package*.json /usr/src/app/

# Cleanup npm cache
RUN rm -rf .npm
