FROM mhart/alpine-node:14.17.3
RUN mkdir /frontend-app
WORKDIR /frontend-app
RUN apk update && apk upgrade && apk add --no-cache bash git
COPY . /frontend-app/
RUN npm i
EXPOSE 3000
CMD ["npm run", "dev"]