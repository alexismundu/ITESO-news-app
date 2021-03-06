const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const mongoUrl = process.env.MONGO_URL;

let db = undefined;
let isConnecting = false;

class Database {
    collectionName;

    constructor() {
        if (isConnecting) return;
        isConnecting = true;
        MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log('Failed to connect to MongoDB', err);
                isConnecting = false;
                return;
            }
            db = client.db();
            console.log('Successfully connected to MongoDB');
        })
    }

    useCollection(collectionName){
        this.collectionName = collectionName;
    }

    find(filters, cb) {
        const collection = db.collection(this.collectionName);
        return collection.find(filters).toArray(cb);
    }
}

module.exports = Database;