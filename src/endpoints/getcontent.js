const Database = require('../db.js');
const db = new Database()

async function getcontent(req, res) {
    const result = await db.getContent(req.query.id);
    res.status(result ? 200 : 404)
        .json(result)
        .send();
}

module.exports = getcontent;