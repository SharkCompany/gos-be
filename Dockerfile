FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN npx prisma generate
RUN yarn build

FROM node:16-alphine
WORKDIR /app
COPY --from=builder /app ./
CMD [ "yarn", "start:prod" ]