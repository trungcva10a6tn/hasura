FROM mhart/alpine-node:14.17.3
RUN mkdir /api-app
WORKDIR /api-app
RUN apk update && apk upgrade && apk add --no-cache bash git
COPY . /api-app/
RUN npm i
EXPOSE 3003
CMD ["npm run", "start"]