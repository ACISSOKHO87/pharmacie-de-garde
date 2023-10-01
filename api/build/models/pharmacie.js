"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pharmaSchema = new mongoose_1.default.Schema({
    pharmaName: String,
    quartier: String,
    address: String,
    latitude: Number,
    longitude: Number,
    titulaireID: String,
    phone: String,
    creationDate: Date
}, { collection: "pharmacie" });
exports.default = mongoose_1.default.model("Pharmacie", pharmaSchema);
