const AWS = require("aws-sdk");
const { client } = require('../../db');
const { TABLENAME } = require('../../db/constants');
const { postToSocketClients } = require('../../utils/websocketUtil');

exports.handler = (event) => {
    const connectionId = event.requestContext.connectionId;
    const roomId = JSON.parse(event.body).data;

    console.log("ExitRoom", connectionId, roomId);

    const params = {
        TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
        Key: {
            roomId: roomId,
            connectionId: connectionId
        }
    };

    client.delete(params).promise()
        .then(async res => {
            await postToSocketClients({
                connectionId: connectionId,
                data: `Exit Room ${roomId}`,
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