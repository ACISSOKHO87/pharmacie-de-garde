import express from "express" // express est importé en tant que cadre principal pour la création de l'application Web
import { Application, Request, Response } from 'express';
const app: Application = express()
app.use(express.urlencoded({ extended: false })) // utilisé pour analyser les corps encodés en URL des requêtes entrantes
app.use(express.json());  // utilisé pour analyser les corps JSON des requêtes entrantes.
const cors = require('cors');
app.use(cors()); //utilisé pour activer le partage de ressources cross-origin.

import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 9500 // le serveur écoute les requêtes sur le port 9500
console.log(PORT)

import { MongoDBClient } from './mongoClient';
import UserRoutes from "./routes/userRoutes";
import AuthRoutes from "./routes/authRoutes";
import PharmacieRoutes from "./routes/pharmacieRoutes";

app.get('/api', (req: Request, res: Response) => {
    res.json({status: 200, data: {msg: "Api is running"}}); 
});

 
AuthRoutes(app);
UserRoutes(app);
PharmacieRoutes(app); 

app.listen(PORT, () => {
    console.log(`Express with Typescript! Server is running on port:${PORT}`);
    MongoDBClient.initialize()
});
  
