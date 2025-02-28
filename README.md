<h1 align='center'>Page One</h1>

## Prequisites
- npm
- docker

## How to work with this repo

1. ```docker-compose up --build -d``` Start the mongodb server
2. ```npm install -y```
3. ```npm run dev```

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