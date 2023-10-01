"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBClient = void 0;
const mongoose = require('mongoose');
exports.MongoDBClient = {
    initialize: () => {
        try {
            const MONGO_URI = process.env.MONGO_URI;
            const client = mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            client.then(() => console.log(`successfully connected to MongoDB`));
        }
        catch (err) {
            throw Error(err);
        }
    }
};
