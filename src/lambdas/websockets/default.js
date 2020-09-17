const AWS = require('aws-sdk');
const { postToSocketClients } = require('../../utils/websocketUtil');
exports.handler = async event => {
    console.log("event", event);
    const { connectionId } = event.requestContext;

    return postToSocketClients({
        connectionId,
        data: "Default route encountered",
        domainName: 'localhost',
        stage: 'dev'
    });
};