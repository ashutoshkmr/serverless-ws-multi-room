const { dynamodb } = require('.');
const { TABLENAME } = require('./constants');

const tableParams = [
    {
        TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
        KeySchema: [
            { AttributeName: "roomId", KeyType: "HASH" },
            { AttributeName: "connectionId", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "roomId", AttributeType: "S" },
            { AttributeName: "connectionId", AttributeType: "S" }
        ],

        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }
];


const tableCreatePromises = tableParams.map((param) => {
    return dynamodb.createTable(param).promise();
});

Promise.all(tableCreatePromises)
    .then(res => { console.log(res); })
    .catch(err => console.error(err));
