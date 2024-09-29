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

## Dockerizing

To dockerize the app, run the following commands:

```bash
docker build -t frekk-fit-party-api .
```

### Save the image to a tar file

```bash
docker save -o frekk-fit-party-api.tar frekk-fit-party-api
```

### Load the image from the tar file

(On the server)

```bash
docker load -i /path/to/frekk-fit-party-api.tar
```

Remember to set the environment variables from the `.env` file and expose the port `4000` when running the container.
