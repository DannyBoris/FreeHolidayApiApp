FROM node:20.4-alpine

WORKDIR /app

# build backend
COPY package*.json .
RUN npm install

# build frontend
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

COPY . .

# build frontend
RUN npm run build --prefix frontend

EXPOSE 3000

CMD ["npm", "start"]
