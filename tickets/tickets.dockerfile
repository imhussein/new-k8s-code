FROM node:14
LABEL serviceName="tickets-service"
LABEL maintainer="Mohamed Hussein"
WORKDIR /app
RUN npm i -g yarn --force
COPY ./package.json .
RUN yarn
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]