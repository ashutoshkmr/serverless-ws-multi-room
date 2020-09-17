const fs = require('fs');
const path = require('path');
const { client } = require('.');

console.log("Importing movies into DynamoDB. Please wait.");

const movieDataFilePath = path.resolve(__dirname, "moviedata.json")

console.log(movieDataFilePath);

const allMovies = JSON.parse(fs.readFileSync(movieDataFilePath, 'utf8'));
allMovies.forEach(function (movie) {
    const params = {
        TableName: "Movies",
        Item: {
            "year": movie.year,
            "title": movie.title,
            "info": movie.info
        }
    };

    client.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", movie.title);
        }
    });
});
