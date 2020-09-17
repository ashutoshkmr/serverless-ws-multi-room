const AWS = require('aws-sdk');
const { client } = require('../../db');
const { TABLENAME } = require('../../db/constants');
const { postToSocketClients } = require('../../utils/websocketUtil');
exports.handler = async event => {
    console.log("SendMessage");

    const msg = JSON.parse(event.body).data;

    const connectionId = event.requestContext.connectionId;


    const params = {
        TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
        ProjectionExpression: "roomId, connectionId",
        FilterExpression: "connectionId =: cid",
        ExpressionAttributeValues: {
            ": cid": connectionId
        }
    };

    let roomId;

    while (roomId === undefined) {
        try {
            const data = await client.scan(params).promise();
            roomId = data.Items[0].roomId;
        } catch (e) {
            console.error("Error", e);
        }
    }

    console.log("roomId", roomId);

    const params2 = {
        TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
        ProjectionExpression: "roomId, connectionId",
        KeyConditionExpression: "roomId =: rid",
        ExpressionAttributeValues: {
            ": rid": roomId
        }
    };

    let data;

    try {
        data = await client.query(params2).promise();
        console.log("Success");
    } catch (e) {
        console.error("Error", e);
    }

    const postCalls = data.Items.map(async ({ roomId, connectionId }) => {
        try {

            await postToSocketClients({
                connectionId: connectionId,
                data: msg,
                domainName: 'localhost',
                stage: 'dev'
            });

        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting $ {connectionId}`);
                await client.delete({
                    TableName: TABLENAME.WEBSOCKET_CONNECTIONS,
                    Key: { roomId: roomId, connectionId: connectionId }
                }).promise();
            } else {
                throw e;
            }
        }
    });

    try {
        await Promise.all(postCalls);
    } catch (e) {
        console.log("Error", e);
    }

    // This just ends the lambda execution and does not send value anywhere
    return {
        statusCode: 200,
        body: JSON.stringify(""),
    };

};