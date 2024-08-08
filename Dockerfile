# set backend
FROM node:20-alpine as node-build

# set working directory
WORKDIR /app

# copy package.json
COPY backend/package.json .

# install dependencies
RUN npm install

COPY backend .

# set react app
FROM node-build as react-build

WORKDIR /app

# build react app
COPY frontend/package.json .
RUN npm install
COPY frontend .
RUN npm run build

# get nginx images
FROM nginx:1.17.9 as nginx-build

# copy nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build app/ app/frontend
COPY --from=node-build app /app

COPY start.sh /start.sh

# expose port
EXPOSE 3000 4444
RUN apt-get update && apt-get install -y
ENV NODE_VERSION=20.0.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# start nginx
CMD ["sh", "/start.sh"]
