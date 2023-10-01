import  Mongoose  from "mongoose";

const pharmaSchema = new Mongoose.Schema({
    pharmaName: String,
    quartier: String,
    address: String,
    latitude: Number,
    longitude: Number,
    titulaireID: String,
    phone: String,
    creationDate: Date

}, {collection: "pharmacie"})

export default Mongoose.model("Pharmacie", pharmaSchema)