const functions = require('firebase-functions');
const request = require('request');
const cors = require('cors')({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getImageUrl = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        const url = req.query.url;
        console.log('request url = ' + url);
        request.get(url, (error, response, body) => {
            const start = body.indexOf('<meta property="og:image" content="');
            console.log('start = ' + start);
            const imageUrlStart = body.substring(start + 35);
            const end = imageUrlStart.indexOf('=');
            console.log('end = ' + end);
            const imageUrl = imageUrlStart.substring(0, end)
            console.log('imageUrl = ' + imageUrl);
            res.send({ url: imageUrl });
        })
    })
});
