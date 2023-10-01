"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const mailing_1 = __importDefault(require("../lib/mailing"));
const checkCode_1 = __importDefault(require("../checkCode"));
const bcrypt = require("bcryptjs");
const saltRounds = Number(process.env.SALTROUNDS);
let jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
function UserRoutes(app) {
    // routes de sauvegarde d'un utilisateur
    app.post("/api/user/save", async (req, res) => {
        const email = await user_1.default.find({ email: req.body.email });
        if (email.length > 0) {
            res.json({ status: 200, msg: "L'email existe déjà. Veuillez vous connecter " });
        }
        else {
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                userStatus: req.body.userStatus,
                creationDate: new Date()
            };
            let user = new user_1.default(data);
            const result = await user.save();
            let objBienvenue = {
                mailTo: req.body.email,
                subject: "Bienvenue à la Pharma'Gard Tamba",
                title: `Bonjour ${req.body.firstName} ${req.body.lastName.toUpperCase()},`,
                text: "Toutes l'équipe de la Pharma'Gard Tamba vous souhaite la bienvenue. \n Vous pouvez nous contacter par mail pour tout informations ou anomalie rencontrée lors de l'utilisation de notre servise. \n Cordialemrnt, \n Toute l'équipe de la Pharma'Gard"
            };
            (0, mailing_1.default)(objBienvenue);
            res.json({ status: 200, data: { result } });
        }
    });
    // routes de connection d'un user
    app.post("/api/user/login", async (req, res) => {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        const user = await user_1.default.find({ email: data.email });
        if (user.length <= 0) {
            res.json({ status: 404, data: { msg: "Email inexistant" } });
        }
        else {
            const compare = await bcrypt.compare(data.password, user[0].password);
            if (!compare) {
                res.json({ status: 404, data: { message: "Mot de passe invalide. Veuillez réessayer!" } });
            }
            else {
                // object pour la création d'un token
                const payload = { email: data.email, id: user[0]._id };
                const token = await jwt.sign(payload, secret);
                res.json({ status: 200, data: { token, user: user[0], message: "Connexion réussi avec succès" } });
            }
        }
    });
    // route de récupération d'un user par son id
    app.get("/api/user/one/:id", async (req, res) => {
        const id = req.params.id;
        const user = await user_1.default.find({ _id: id });
        res.json({ status: 200, data: { user: user[0] } });
    });
    // route de modification du mot de passe
    app.post("/api/user/password/forgot", async (req, res) => {
        let email = await user_1.default.find({ email: req.body.email });
        if (email.length <= 0) {
            res.json({ status: 404, data: { message: "Email invalide. Veuillez réessayer!" } });
        }
        else {
            let payload = { id: email[0]._id, code: req.body.digit };
            let token = jwt.sign(payload, secret, { expiresIn: '3h' });
            // on envoi un mail avec un code de redefinition de mdp qui 
            // envoie du mail de modification de mot de passe
            let obj = {
                mailTo: req.body.email,
                subject: "Changement de mot de passe",
                title: "Mot de passe oublié ?",
                text: `Voici le code de vérification de votre mail: <strong>${req.body.digit}</strong>`
            };
            (0, mailing_1.default)(obj);
            res.json({ status: 200, data: { message: "Le code de validation envoyé par mail" }, token: token });
        }
    });
    app.put("/api/user/password/reset", checkCode_1.default, async (req, res) => {
        let _id = req.body._id;
        let code = req.body.digitCode;
        // on vérifie si le code fourni est valide
        if (code !== req.body.code) {
            res.json({ status: 404, msg: "Le code invalide. Veuillez réessayer!" });
        }
        if (req.body.password1 !== req.body.password2) {
            res.json({ status: 404, data: { msg: "Les mots de passe ne correspondent pas" } });
        }
        else {
            const hash = await bcrypt.hash(req.body.password1, saltRounds);
            let user = await user_1.default.findOneAndUpdate({ _id: _id }, { password: hash });
            res.json({ status: 200, data: { message: "Mot de passe modifié avec succée !" } });
        }
    });
    app.post('/api/user/contact', async (req, res) => {
        let objContact = {
            mailTo: "pharma.gardtc@gmail.com",
            subject: "Contact: " + req.body.title,
            title: req.body.subject,
            text: req.body.message
        };
        (0, mailing_1.default)(objContact);
        res.json({ status: 200, data: { message: "Email envoyé avec succès" } });
    });
}
exports.default = UserRoutes;
