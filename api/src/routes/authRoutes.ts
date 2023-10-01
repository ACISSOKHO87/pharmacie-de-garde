import { Application, Request, Response } from "express";
import withAuth from "../withAuth";
import { UserQuery } from '../types/user-types';
import User from '../models/user'

export default function AuthRoutes(app: Application): void {
    app.get("/api/auth/checkToken", withAuth, async (req: Request, res: Response)=>{
        const _id = req.body._id;
        const user:Array<UserQuery> = await User.find( { _id } );
        res.json({ status: 200,  user: user[0] })
    })
}