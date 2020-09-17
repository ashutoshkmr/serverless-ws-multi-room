const { client } = require('../../db');
const { TABLENAME } = require('../../db/constants');
const { postToSocketClients } = require('../../utils/websocketUtil');

exports.handler = async event => {
    const { connectionId } = event.requestContext;
    console.log(`New connection : ${connectionId}`);

    await postToSocketClients({
        connectionId: connectionId,
        data: `Connected`,
        domainName: 'localhost',
        stage: 'dev'
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ body: "connected" })
    };
};