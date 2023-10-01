const mongoose = require('mongoose');
export const MongoDBClient = {
    initialize: () => {
        try {
            const MONGO_URI = process.env.MONGO_URI
            const client =  mongoose.connect(MONGO_URI, 
                { 
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                })
            client.then(() => console.log(`successfully connected to MongoDB`));
        } catch(err:any) {
            throw Error(err);
        }
    }
}
 