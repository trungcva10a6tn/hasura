FROM hasura/graphql-engine:latest.cli-migrations-v2
RUN mkdir /backend-app
WORKDIR /backend-app
COPY . /backend-app/
#RUN hasura-cli migrate apply
#RUN hasura-cli seed apply