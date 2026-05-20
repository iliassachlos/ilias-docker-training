FROM node:22-alpine

WORKDIR /app

RUN npm install -g json-server

RUN mkdir -p /app/data

COPY db/db.json /app/data/db.json

EXPOSE 8080

CMD ["json-server", "/app/data/db.json", "--port", "8080", "--host", "0.0.0.0"]