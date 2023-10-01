const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
import { Request, Response, NextFunction } from "express";

export default function checkCode(req: Request, res: Response, next: NextFunction):void{
    const token = req.headers['x-access-token'];
    if(token === undefined) {
        res.json({status: 404, data: {msg:"Token not found"}})
    } else {
        jwt.verify(token, secret, (err: any, decode: any):void=>{
            if(err){
                res.json({status: 401, data: {msg: "invalid token"}})
            } else {
                req.body._id = decode.id;
                req.body.digitCode = decode.code
                next()
            }
        })
    }
}

