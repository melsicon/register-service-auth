# Test web app that returns the name of the host/pod/container servicing req
# Linux x64
FROM node:latest

LABEL org.opencontainers.image.title="Example Auth" \
      org.opencontainers.image.description="Example Auth API" \
      org.opencontainers.image.authors="@marvinbernd"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install

# Command for container to execute
ENTRYPOINT [ "node", "index.js" ]