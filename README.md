# Backend API

## Environment

-   [Node v16.17.0](https://nodejs.org/en/download/releases/)

## Main Technologies

-   [Serverless](https://www.serverless.com/cloud/docs)
-   [GraphQL](https://graphql.org/learn/)
-   [Type GraphQL](https://typegraphql.com/docs/introduction.html)
-   [AWS Lambda](https://aws.amazon.com/lambda/)
-   [Knex query builder](https://knexjs.org/guide/)
-   [Typescript](https://www.typescriptlang.org/docs/)
-   [JWT](https://www.npmjs.com/package/jsonwebtoken)
-   [Express](https://expressjs.com/en/guide/routing.html)

## Run

-   Config environment variables

```
cp .env.example .env
```

-   Migrate Database
    Please make sure mySQL run on your machine and DB connection configured correctly in .env

```
yarn migrate
```

-   Database Seed

```
yarn seed
```

-   Install Node modules

```
npm install
```

or

```
yarn install
```

-   Run project

```
yarn dev
```

-   Open graphQL playground[http://localhost:4444]
