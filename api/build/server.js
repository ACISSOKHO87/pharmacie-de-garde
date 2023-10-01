"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // express est importé en tant que cadre principal pour la création de l'application Web
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false })); // utilisé pour analyser les corps encodés en URL des requêtes entrantes
app.use(express_1.default.json()); // utilisé pour analyser les corps JSON des requêtes entrantes.
const cors = require('cors');
app.use(cors()); //utilisé pour activer le partage de ressources cross-origin.
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 9500; // le serveur écoute les requêtes sur le port 9500
console.log(PORT);
const mongoClient_1 = require("./mongoClient");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const pharmacieRoutes_1 = __importDefault(require("./routes/pharmacieRoutes"));
app.get('/api', (req, res) => {
    res.json({ status: 200, data: { msg: "Api is running" } });
});
(0, authRoutes_1.default)(app);
(0, userRoutes_1.default)(app);
(0, pharmacieRoutes_1.default)(app);
app.listen(PORT, () => {
    console.log(`Express with Typescript! Server is running on port:${PORT}`);
    mongoClient_1.MongoDBClient.initialize();
});
