function mostrecentupload(req, res) {
    let most_recent = null;
    db.db.forEach(elem => {
        if (elem.upload_date < most_recent.upload_date || !most_recent) {
            most_recent = elem;
        }
    })
    res.status(most_recent ? 200 : 404)
        .json(most_recent)
        .send();
}

module.exports = mostrecentupload;