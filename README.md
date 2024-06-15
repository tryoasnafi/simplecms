# Simple CMS API

## Description
This is Simple CMS service
 
## Tech Stacks
- Node.js `>= v20.14.0`: https://github.com/nodejs/node
- MySQL:  https://github.com/mysql/mysql-server
- MongoDB: https://github.com/mongodb/mongo
- Docker: https://github.com/docker

## Framework & Library
- NestJS: https://github.com/nestjs/nest
- Prisma (ORM): https://github.com/prisma/prisma
- Class Validator (Validation): https://github.com/typestack/class-validator
- Swagger (API Docs): https://github.com/nestjs/swagger

## API Documentation
API Spec use OpenAPI Swagger, you can see the documentation in `/api`

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# copy and set env
$ cp -p .example.env .env

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Docker

## Development

Please use `compose.yaml` for development.
  
```bash
$ docker-compose -f compose.yaml up -d
```

## Setup database
We need to execute project command inside the container

```sh
$ docker exec -it simplecms-api-1 sh

# generate prisma client
$ yarn prisma:generate

# run migration
$ yarn dbpush
```