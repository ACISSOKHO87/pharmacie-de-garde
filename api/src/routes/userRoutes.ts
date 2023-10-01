import { Application, Request, Response } from "express";
import { UserQuery } from '../types/user-types';
import User from '../models/user'
import mailing from "../lib/mailing";
import checkCode from "../checkCode";
const bcrypt = require("bcryptjs");
const saltRounds = Number(process.env.SALTROUNDS);
let jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

export default function UserRoutes(app: Application): void {
    // routes de sauvegarde d'un utilisateur
    app.post("/api/user/save", async (req: Request, res: Response)=>{
        const email:Array<UserQuery> = await User.find({email: req.body.email});
        if(email.length > 0) {
            res.json({status: 200, msg: "L'email existe déjà. Veuillez vous connecter "})
        } else {
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const data: UserQuery = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,            
                userStatus: req.body.userStatus,
                creationDate: new Date()
            }

            let user = new User(data);         
            const result = await user.save();
            let objBienvenue = {
                mailTo: req.body.email  as string,
                subject: "Bienvenue à la Pharma'Gard Tamba",
                title: `Bonjour ${req.body.firstName} ${req.body.lastName.toUpperCase()},`,
                text:  "Toutes l'équipe de la Pharma'Gard Tamba vous souhaite la bienvenue. \n Vous pouvez nous contacter par mail pour tout informations ou anomalie rencontrée lors de l'utilisation de notre servise. \n Cordialemrnt, \n Toute l'équipe de la Pharma'Gard"
            }
            mailing(objBienvenue)
            res.json({status:200, data: {result}});
        }
    })

    // routes de connection d'un user
    app.post("/api/user/login", async (req: Request, res: Response)=>{
        
        const data: {email: string, password: string} = {
            email: req.body.email,
            password: req.body.password
        }

        const user:Array<UserQuery> = await User.find({email: data.email});
        if(user.length <= 0) {
            res.json({status:404, data: {msg: "Email inexistant"}});
        } else {
            const compare = await bcrypt.compare(data.password, user[0].password);
            if(!compare) {
                res.json({status:404, data: {message: "Mot de passe invalide. Veuillez réessayer!"}});
            } else {
                // object pour la création d'un token
                const payload = {email: data.email, id: user[0]._id};
		        const token = await jwt.sign(payload, secret);
                res.json({status:200, data: {token, user: user[0], message: "Connexion réussi avec succès"}})
            }
            
        }
    })

    // route de récupération d'un user par son id
    app.get("/api/user/one/:id", async (req: Request, res: Response)=>{
        const id = req.params.id;
        const user:Array<UserQuery> = await User.find({ _id: id });
        res.json({status:200, data: {user: user[0]}});
    })
    
    // route de modification du mot de passe
    app.post("/api/user/password/forgot", async(req:Request, res: Response) => {
        let email = await User.find({email: req.body.email })
        if(email.length <= 0) {
            res.json({status: 404, data: {message: "Email invalide. Veuillez réessayer!"}})
        } else {
            let payload = {id: email[0]._id, code: req.body.digit}
            let token = jwt.sign(payload, secret,  {expiresIn: '3h'})
            // on envoi un mail avec un code de redefinition de mdp qui 
            // envoie du mail de modification de mot de passe
            let obj = {
                mailTo: req.body.email  as string,
                subject: "Changement de mot de passe",
                title: "Mot de passe oublié ?",
                text:  `Voici le code de vérification de votre mail: <strong>${req.body.digit}</strong>`
            }
            mailing(obj)
            res.json({status: 200, data: {message: "Le code de validation envoyé par mail"}, token : token})
        }
    })

    app.put("/api/user/password/reset", checkCode, async(req:Request, res: Response) => {
        let _id = req.body._id;
        let code = req.body.digitCode;
        // on vérifie si le code fourni est valide
        if(code !== req.body.code) {
            res.json({status: 404, msg: "Le code invalide. Veuillez réessayer!"})
        }
        if(req.body.password1 !== req.body.password2){
            res.json({status: 404, data: {msg: "Les mots de passe ne correspondent pas"}})
        } else {
            const hash = await bcrypt.hash(req.body.password1, saltRounds);
            let user = await User.findOneAndUpdate({_id: _id}, {password: hash})
            res.json({status: 200, data: {message: "Mot de passe modifié avec succée !"}})
        }
    })

    app.post('/api/user/contact', async(req:Request, res: Response) => {
        let objContact = {
            mailTo: "pharma.gardtc@gmail.com",
            subject: "Contact: " + req.body.title,
            title: req.body.subject,
            text: req.body.message
        }
        mailing(objContact)
        res.json({status: 200, data: {message: "Email envoyé avec succès"}})
    })

}
