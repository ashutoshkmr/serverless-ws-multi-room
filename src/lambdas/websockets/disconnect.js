exports.handler = async event => {
    const { connectionId } = event.requestContext;
    console.log(`Disconnect : ${connectionId}`);
    return {
        statusCode: 200,
        body: JSON.stringify({ body: "disconnected" })
    };
}