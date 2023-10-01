"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const withAuth_1 = __importDefault(require("../withAuth"));
const user_1 = __importDefault(require("../models/user"));
function AuthRoutes(app) {
    app.get("/api/auth/checkToken", withAuth_1.default, async (req, res) => {
        const _id = req.body._id;
        const user = await user_1.default.find({ _id });
        res.json({ status: 200, user: user[0] });
    });
}
exports.default = AuthRoutes;
