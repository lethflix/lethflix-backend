const admin_token = require('../../config.json').lf_admin_token;

function verify(req, res) {
    const token = req.query.token;
    if (token) {
        if (token == admin_token) {
            return res.status(200).end();
        }
    }
    res.status(404).end()
}

module.exports = verify;