FROM node:20.4-alpine

WORKDIR /app
ARG PORT=3000
ENV PORT=$PORT
# build backend
COPY package*.json .
RUN npm install

# build frontend
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

COPY . .

# build frontend
RUN npm run build --prefix frontend

EXPOSE $PORT

CMD ["npm", "start"]
