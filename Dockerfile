# ---------- Build Stage ----------
FROM node:lts AS build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

# 1️⃣ Copy package.json before setting WORKDIR
COPY package.json /tmp/package.json

# 2️⃣ Now switch to your working directory
WORKDIR /usr/src/app/

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
COPY /tmp/package.json ./package.json
RUN npm install --omit=dev

# Copy everything else
COPY . .

# Cleanup npm cache
RUN rm -rf .npm
