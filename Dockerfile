# ---------- Build Stage ----------
FROM node:lts AS build

ENV NODE_ENV=production \
    DAEMON=false \
    SILENT=false \
    USER=nodebb \
    UID=1001 \
    GID=1001

# Copy package.json before setting WORKDIR
COPY package.json /usr/src/app/package.json

# Set working directory AFTER copying
WORKDIR /usr/src/app/

# Copy custom plugin early
COPY nodebb-plugin-mailgun-delivery ./nodebb-plugin-mailgun-delivery

RUN corepack enable
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install tini && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid ${GID} ${USER} \
    && useradd --uid ${UID} --gid ${GID} --home-dir /usr/src/app/ --shell /bin/bash ${USER} \
    && chown -R ${USER}:${USER} /usr/src/app/

USER ${USER}

# Install dependencies
RUN npm install --omit=dev

# Copy rest of project (source + config)
COPY . .

RUN rm -rf .npm
