"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pharmacie_1 = __importDefault(require("../models/pharmacie"));
function PharmacieRoutes(app) {
    // route de sauvegarde d'une pharmacie
    app.post("/api/pharmacie/save", async (req, res) => {
        const data = {
            pharmaName: req.body.pharmaName,
            quartier: req.body.quartier,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            titulaireID: req.body.titulaireID,
            phone: req.body.phone,
            creationDate: new Date()
        };
        let pharma = new pharmacie_1.default(data); // creation d'un objet de type Pharmacie
        const result = await pharma.save(); // sauvegarde de l'objet dans la base donnée (BDD)
        res.json({ status: 200, data: { message: "Inscription réussi avec succès." } }); //envoie d'une reponse json avec un status 200 et le resultat de la souvegarde si opération avec succés
    });
    // routes de récupation de tous les pharmacies
    app.get("/api/pharmacie/all", async (req, res) => {
        let pharmacies = await pharmacie_1.default.find({});
        if (pharmacies.length <= 0) {
            res.json({ status: 500, data: { msg: "request problem", pharmacies: pharmacies } }); // la request a échoué
        }
        res.json({ status: 200, data: { pharmacies: pharmacies } }); //envoie d'une reponse json avec un status 200 et le resultat
    });
    // route de récupération d'une pharmacie par son id
    app.get('/api/pharmacie/ByTitulaire/:id', async (req, res) => {
        let titulaireID = req.params.id;
        let pharma = await pharmacie_1.default.findOne({ titulaireID: titulaireID });
        if (pharma === null) {
            res.json({ status: 500, data: { msg: "request problem", pharmacie: pharma } }); // la request a échoué
        }
        res.json({ status: 200, data: { pharmacie: pharma } });
    });
    // routes de supression d'un objet pharmacie par son id
    app.delete("/api/pharmacie/delete/one/:id", async (req, res) => {
        let id = req.params.id;
        const result = await pharmacie_1.default.deleteOne({ _id: id });
        res.json({ status: 200, data: { msg: "delete successfully", result: result } });
    });
}
exports.default = PharmacieRoutes;
