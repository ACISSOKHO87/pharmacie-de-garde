import { Application, Request, Response } from "express";
import { PharmaQuery } from "../types/pharmacie-types";
import Pharmacie from "../models/pharmacie";

export default function PharmacieRoutes(app: Application): void {

    // route de sauvegarde d'une pharmacie
    app.post("/api/pharmacie/save",async (req:Request, res: Response) => {
        const data: PharmaQuery ={
            pharmaName: req.body.pharmaName,
            quartier: req.body.quartier,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            titulaireID: req.body.titulaireID,
            phone: req.body.phone,
            creationDate: new Date()
        }

        let pharma = new Pharmacie(data); // creation d'un objet de type Pharmacie
        const result = await pharma.save(); // sauvegarde de l'objet dans la base donnée (BDD)
        res.json({status:200, data: {message: "Inscription réussi avec succès."}});  //envoie d'une reponse json avec un status 200 et le resultat de la souvegarde si opération avec succés
    })

    // routes de récupation de tous les pharmacies
    app.get("/api/pharmacie/all",async (req:Request, res:Response) => {
        let pharmacies = await  Pharmacie.find({});
        if(pharmacies.length <= 0) {
            res.json({status: 500, data: {msg: "request problem", pharmacies: pharmacies}}); // la request a échoué
        }
        res.json({status: 200, data: { pharmacies: pharmacies }}); //envoie d'une reponse json avec un status 200 et le resultat
    })

    // route de récupération d'une pharmacie par son id
    app.get('/api/pharmacie/ByTitulaire/:id',async (req:Request, res:Response) => {
        let titulaireID = req.params.id;
        let pharma = await Pharmacie.findOne({ titulaireID: titulaireID })
        if(pharma === null) {
            res.json({status: 500, data: {msg: "request problem", pharmacie: pharma}}); // la request a échoué
        }
        res.json({status: 200, data: {pharmacie: pharma}})
    })

    // routes de supression d'un objet pharmacie par son id
    app.delete("/api/pharmacie/delete/one/:id",async (req:Request, res:Response) => {
        let id = req.params.id;
        const result = await Pharmacie.deleteOne({ _id: id });
        res.json({status: 200, data: {msg: "delete successfully", result: result}});
    })
} 