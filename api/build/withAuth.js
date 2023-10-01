"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
function withAuth(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token === undefined) {
        res.json({ status: 404, data: { msg: "Token not found" } });
    }
    else {
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                res.json({ status: 401, data: { msg: "invalid token" } });
            }
            else {
                req.body._id = decode.id;
                next();
            }
        });
    }
}
exports.default = withAuth;
