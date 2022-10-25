FROM node:latest as base

RUN mkdir -p /app

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY frontend/ .

CMD ["yarn", "start"]

EXPOSE 3000