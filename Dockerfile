# Use an official Node.js runtime as the base image
FROM node:20.14-alpine3.19 as base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY yarn.lock ./

# Copy the rest of the application code to the working directory
COPY . .

FROM base as install

# Install dependencies
RUN yarn install --frozen-lockfile

FROM install as test

RUN yarn test

FROM install as lint

RUN yarn lint

FROM install as build

RUN yarn build

CMD ["node", "dist/server.js"]
