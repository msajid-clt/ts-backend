import UserModel from "../database/models/user.model";
import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserRepo = async (userId: string): Promise<IUserInterface | null> => {
    try {
        const user = await UserModel.findOne({ uid: userId });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteUserRepo = async (userId: string): Promise<boolean> => {
    try {
        const deleted = await UserModel.findOneAndDelete({ uid: userId });
        if (deleted) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

export const createUserRepo = async (user: IUserInterface): Promise<boolean> => {
    try {
        const created = await UserModel.create({
            uid: user.uid,
            tweets: user.tweets,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        });
        if (created) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserRepo = async (userId: string, user: IUserInterface): Promise<boolean> => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ uid: userId }, user, { new: true, runValidators: true });
        if (updatedUser) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserWithTweetIdRepo = async (userId: string, tweetId: string): Promise<boolean> => {
    try {

        const updateTweet = await UserModel.findOneAndUpdate(
            { uid: userId },
            { $push: { tweets: tweetId } }
        )
        if (updateTweet) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return (false);
    }
};

export const removeTweetIdFromUserRepo = async (userId: string, tweetId: string): Promise<boolean> => {
    try {

        const removeTweet = await UserModel.findOneAndUpdate(
            { uid: userId },
            { $pull: { tweets: tweetId } }
        )
        if (removeTweet) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return (false);
    }
};