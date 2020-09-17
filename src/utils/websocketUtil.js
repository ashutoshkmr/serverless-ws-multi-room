const AWS = require('aws-sdk');

const create = (endpoint = 'http://localhost:3001') => {
    // const endpoint = `${domainName}/${stage}`;
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint,
    });
};

const postToSocketClients = ({ domainName, stage, connectionId, data }) => {
    const ws = create();

    const postParams = {
        Data: data,
        ConnectionId: connectionId,
    };

    return ws.postToConnection(postParams).promise();
};

module.exports = {
    postToSocketClients,
};