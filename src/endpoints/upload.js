const Database = require('../db.js');
const db = new Database()

async function upload(req, res) {
    try {
        console.log("Upload attempt!");
        if (req.body !== undefined) {
            const dbId = await db.setContent(req.body);
            if (dbId !== null) return res.status(200).send(dbId);
            return res.status(400).send('dbId was null!');
        }
        res.status(400).send('req.body was undefined!');
    }
    catch(e) {
        res.status(400).send(e);
    }
}

module.exports = upload;