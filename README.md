# GraphQL Coding Challenge

> Author: Kesava Nidadavolu <kesav.jav@gmail.com>

- [GraphQL Coding Challenge](#graphql-coding-challenge)
  - [Setup](#setup)
    - [Clone this repository](#clone-this-repository)
  - [Environment variables](#environment-variables)
    - [Install node modules](#install-node-modules)
    - [Start NODE Server](#start-node-server)
  - [Setup for Docker](#setup-for-docker)
  - [Send Requests to the graphQL API](#send-requests-to-the-graphql-api)
    - [Get Users](#get-users)
    - [Get a single User by id](#get-a-single-user-by-id)
    - [Get Posts](#get-posts)
    - [Get a single Post by id](#get-a-single-post-by-id)
    - [Get Comments](#get-comments)
    - [Get a single Comment by id](#get-a-single-comment-by-id)
    - [Get Comments from PostId](#get-comments-from-postid)
    - [Update a post](#update-a-post)
    - [Delete a post](#delete-a-post)
  - [Build the docker image and publish steps](#build-the-docker-image-and-publish-steps)
    - [Run the docker build command inside the project directory](#run-the-docker-build-command-inside-the-project-directory)
    - [Push your image to your docker hub](#push-your-image-to-your-docker-hub)
    - [Run the docker command to deploy your modified service](#run-the-docker-command-to-deploy-your-modified-service)

## Setup

### Clone this repository

```{sh}
git clone https://github.com/nidadavolukesava/graphql-cc.git
```

After cloning the repository go into the directory:

```{sh}
cd graphql-cc
```

## Environment variables

add .env file if it doesn't exist and set these environment Variables

```{env}
# Node environment variable. Options: [development | test | production]
NODE_ENV=production
#
# Development mock service
DEV_MOCK_SERVICE_PROTOCOL=https
DEV_MOCK_SERVICE=jsonplaceholder.typicode.com
# Development server setup
DEV_APP_HOST=0.0.0.0
DEV_APP_PORT=7143
#
# test mock service
TEST_MOCK_SERVICE_PROTOCOL=https
TEST_MOCK_SERVICE=jsonplaceholder.typicode.com
# test server setup
TEST_APP_HOST=0.0.0.0
TEST_APP_PORT=7143
#
# production mock service
PROD_MOCK_SERVICE_PROTOCOL=https
PROD_MOCK_SERVICE=jsonplaceholder.typicode.com
# production server setup
PROD_APP_HOST=0.0.0.0
PROD_APP_PORT=7143
```

The environment variables are divided into 3 categories, namely development(DEV), test(TEST) and production(PROD)

1. The `*_MOCK_SERVICE_PROTOCOL` is protocol used to connect to the backend APIs: http or https.

2. The `*_MOCK_SERVICE` is the url of the backend service.

3. The `*_APP_HOST` is the IP address/domain name of the server on which the service is deployed on.

4. The `*_APP_HOST` is the port on server on which you want to deploy the APIs service on.

### Install node modules

Install the package dependencies using npm install:

```{sh}
npm install
```

### Start NODE Server

Start the node server using `npm start` and your GraphQL API service is running

```{sh}
npm start
```

## Setup for Docker

install docker and run this command: `docker run -p <your desired port number>:7143 -d kesavanidadavolu/graphql --name <your preferred name>`

Example:

```{sh}
docker run -p 8080:7143 -d kesavanidadavolu/graphql --name graphql-cc
```

In case you want to modify the service and [build the docker image](#build-the-docker-image-and-publish-steps) take a look at the end of the document.

## Send Requests to the graphQL API

### Get Users

`-X POST http://localhost:7143/graphql`

Request

```{json}
query{
  users{
    id
    name
    username
    email
    phone
    website
    address {
      street
      suite
      city
      zipcode
    }
  }
}
```

### Get a single User by id

`-X POST http://localhost:7143/graphql`

```{json}
query{
  user(id:1){
    id
    name
    username
    email
    phone
    website
    address {
      street
      suite
      city
      zipcode
    }
    }
  }

```

Request

### Get Posts

`-X POST http://localhost:7143/graphql`

Request

```{json}
query{
  posts{
    id
    user {
      id
    }
    title
    body
    comments {
      id
    }
  }
}
```

### Get a single Post by id

`-X POST http://localhost:7143/graphql`

Request

```{json}

query{
  post(id:1){
    id
    title
    body
  }
}
```

### Get Comments

`-X POST http://localhost:7143/graphql`

Request

```{json}
query{
  comments{
     id
    name
    email
    body
  }
}

```

### Get a single Comment by id

`-X POST http://localhost:7143/graphql`

Request

```{json}
query{
  comment(id : 1){
     id
    name
    email
    body
  }
}
```

### Get Comments from PostId

`-X POST http://localhost:7143/graphql`

Request

```{json}
query{
  postComments(postId : 1){
     id
    name
    email
    body
  }
}
```

### Update a post

`-X POST http://localhost:7143/graphql`

Request

```{json}
mutation {
  updatePost(id: 1, title: "Any title", body: "Any body value") {
    id
    title
    body
  }
}
```

### Delete a post

`-X POST http://localhost:7143/graphql`

Request

```{json}
mutation{
deletePost(id:1)
}
```

## Build the docker image and publish steps

In case you want to modify the service and build your own docker image follow these steps after doing your changes:

### Run the docker build command inside the project directory

```{sh}
docker build -t <your docker username>/graphql-cc
```

By default the docker tag will be `latest`. You can find out more about tagging online.

### Push your image to your docker hub

```{sh}
docker push <your docker username>/graphql-cc
```

### Run the docker command to deploy your modified service

```{sh}
docker run -p 8080:7143 -d <your docker username>/graphql --name graphql-cc
```

> Incase you changed the port in the environment file (which you don't need to) change the `EXPOSE <new port>` in the docker file before building it.
>
> enjoy coding...
