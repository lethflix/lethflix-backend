const admin = require('firebase-admin');
const serviceAccount = require('../lethflix-b6dfbf3015b0.json');

module.exports = class DatabaseHandler {

    constructor() {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } catch (e) {}

        this.db = admin.firestore();
    }

    async getContent(contentId) {
        // this might fuck up https://firebase.google.com/docs/firestore/query-data/get-data
        const snapshot = await (await this.db.doc(`content/${contentId}`).get()).data();
        /*let result = null
        snapshot.forEach(doc => doc.link_id === contentId ? result = doc : result = 'not found!');*/
        /*const result = snapshot[contentId] !== null ? snapshot[contentId] : 'not found!';
        return result;*/
        if (snapshot) delete snapshot.previous_content._firestore;
        else return undefined
        return snapshot;
    }

    async setContent(data, newData = null) {
        // check data
        const isValidData = data.description !== null && data.title !== null && data.urls.video !== null;
        console.log(`is valid: ${data.description}, ${data.title}, ${data.urls.video}`);
        if (!isValidData) return null;

        // save to db
        let res = null;
        if (newData) {
            res = await db.collection('content').doc(data._id).set(newData);
        }
        else {
            // save date_time
            res = await db.collection('content').add(data);
        }
        console.log(`res: ${res}`);
        return res.id;
    }

    removeContent(contentData) {
        // ...
    }

    searchContent(query) {
        // ...
    }

    getUser(userData) {
        // ...
    }

    addUser(userData) {
        // ...
    }

    setUsers(data, newData = null) {
        // ...
    }

    removeUser(contentData) {
        // ...
    }

}