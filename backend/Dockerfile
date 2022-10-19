FROM node:latest as base

WORKDIR /backend

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

CMD ["yarn", "nodemon"]

EXPOSE 2022