import { Request, Response } from 'express';
import { getUserRepo, createUserRepo, deleteUserRepo, updateUserRepo } from "../repositories/user.repository";
import { IUserInterface } from "../database/interfaces/user.interface";
import UserModel from '../database/models/user.model';

export const getUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    try {
        const user = await getUserRepo(userId);
        if (user) {
            res.status(200).json({data: user});
        } else {
            res.status(500).json({error: "User not found!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const createUserController = async (req: Request, res: Response) => {
    const user:IUserInterface = new UserModel({
        uid: req.body.uid,
        tweets: req.body.tweets,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        createdAt: new Date()});
    try {
        const success = await createUserRepo(user);
        if (success) {
            res.status(200).json({data: user});
        } else {
            res.status(500).json({"error": "Error occured while creating!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    try {
        const success = await deleteUserRepo(userId);
        if (success) {
            res.status(200).json({"data": "User deleted"});
        } else {
            res.status(500).json({"error": "User not deleted!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const user = req.body;
    try {
        const success = await updateUserRepo(userId, user);
        if (success) {
            res.status(200).json({data: user});
        } else {
            res.status(500).json({"error": "Error occured while updating!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}