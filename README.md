# Multi Room chat app with AWS APIGateway & DynamoDb

- ### Run DynamoDb locally using docker

  ```bash
  $ docker-compose up

  // or

  $ docker run -p 8000: 8000 amazon/dynamodb-local

  ```

- ### Create Tables

  ```bash
  $ node src/db/createTable.js
  ```

- ### Run the app
  ```bash
  $ serverless offline
  ```
