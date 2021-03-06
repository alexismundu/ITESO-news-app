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

    getCollection(){
        return db.collection(this.collectionName);
    }

    find(filters, cb) {
        return this.getCollection().find(filters).toArray(cb);
    }

    findOne(filters, cb) {
        return this.getCollection().findOne(filters, cb);
    }

    insertOne(obj, cb) {
        return this.getCollection().insertOne(obj, cb);
    }
}

module.exports = Database;