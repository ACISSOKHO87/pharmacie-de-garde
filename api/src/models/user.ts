import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userStatus: String,
    creationDate: Date
}, {collection: "user"})

export default Mongoose.model('User', userSchema)