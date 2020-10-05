const https = require('https');
const url = require('url');

/**
 * STOLEN FROM: https://github.com/msbit/dropbox-cors-redirect/blob/master/function.js
 */
function tunnel(req, res) {

    const dropboxUrlParam = req.query.url;

    if (!dropboxUrlParam || !dropboxUrlParam.startsWith('https://www.dropbox.com/')) {
        return res.status(403)
            .send({ error: 'Forbidden' });
    }

    const dropboxUrl = url.parse(dropboxUrlParam);
    const dropboxUrlPath = dropboxUrl.path;
    const dropboxUrlPathParts = dropboxUrlPath.split('/');
    const dropboxUrlRawPath = [dropboxUrlPathParts[1], 'raw', dropboxUrlPathParts[2], dropboxUrlPathParts[3]].join('/');

    https.get(`https://${dropboxUrl.hostname}/${dropboxUrlRawPath}`, result => {

        if (result.statusCode !== 302) {
            return res.status(result.statusCode)
                .send({ error: result.statusMessage });
        }

        /*const headerKeys = Object.keys(result.headers);
        headerKeys.forEach(key => {
            console.log(key + ", " + result.headers[key])
            res.set(key, result.headers[key])
        });*/
        res.set('location', result.headers['location']);
        res.set('Access-Control-Allow-Origin', '*');

        res.status(result.statusCode)
            .send();

    });

}

module.exports = tunnel;