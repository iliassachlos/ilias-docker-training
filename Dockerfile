# STAGE 1: Build the React app
FROM node:22-alpine AS build-stage

WORKDIR /app

ARG BUILD_ENV
ARG VITE_SERVER_URL

ENV VITE_SERVER_URL=$VITE_SERVER_URL 

COPY package*.json ./

RUN npm install

COPY . .

RUN if [ "$BUILD_ENV" = "production" ]; then \
    npm run build; \
    elif [ "$BUILD_ENV" = "staging" ]; then \
    npm run build:staging; \
    else \
    npm run build:dev; \
    fi

# STAGE 2: Serve the app using NGINX
FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]