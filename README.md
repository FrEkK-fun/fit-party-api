# FrEkK Fit Party, API

This is the API for the FrEkK Fit Party website. It is built using Node.js and Express.

## Description

The API is built to serve the FrEkK Fit Party website with data. The API is connected to a MongoDB database, and it serves data to the website through a RESTful API.

## Built With

- Node.js
- Express
- MongoDB

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:FrEkK-fun/fit-party-api.git
```

2. Install the dependencies:

```bash
npm install
```

### Running

To run the app in dev mode, run the following commands:

```bash
npm run dev
```

To run the app in production mode, run the following commands:

```bash
npm start
```

## Docker

The API can be run in a Docker container. The container is automatically built on changes to main, and the :latest image can be found by running:

```bash
docker pull ghcr.io/frekk-fun/fit-party-api:latest
```

Remember to set the environment variables from the `.env` file and expose the port `4000` when running the container.
