FROM node:latest as base

RUN mkdir -p /app

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY backend/ .

CMD ["yarn", "start"]

EXPOSE 2022