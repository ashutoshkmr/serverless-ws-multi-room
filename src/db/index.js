const AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
});


const dynamodb = new AWS.DynamoDB({
    apiVersion: "latest",
    endpoint: "http://localhost:8000",

});

const client = new AWS.DynamoDB.DocumentClient({
    apiVersion: "latest",
    endpoint: "http://localhost:8000",
});

module.exports = {
    dynamodb,
    client
};