<h1 align='center'>Page One</h1>

## Prequisites
- npm
- docker

## How to work with this repo

1. ```npm install -y```
2. ```npm run dev```
3. ```docker-compose up --build -d``` Start the mongodb server

If finished, make sure to compose down
```
docker-compose down
```

## Run unit tests

```
npm test
```

### Test coverage
```
npm test -- --coverage
```