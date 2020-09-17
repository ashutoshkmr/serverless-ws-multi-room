const AWS = require("aws-sdk");
const { client } = require('../../db');
const { TABLENAME } = require('../../db/constants');
const { postToSocketClients } = require('../../utils/websocketUtil');

exports.handler = (event) => {
    const connectionId = event.requestContext.connectionId;
    const roomId = JSON.parse(event.body).data;

    console.log("EnterRoom", connectionId, roomId);

    const params = {
        TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
        Item: {
            roomId: roomId,
            connectionId: connectionId
        }
    };

    client.put(params).promise()
        .then(async res => {
            await postToSocketClients({
                connectionId: connectionId,
                data: `Enter Room ${roomId}`,
                domainName: 'localhost',
                stage: 'dev'
            });
        })
        .catch(err => console.log(err));

    return {
        statusCode: 200,
        body: JSON.stringify(""),
    };
};