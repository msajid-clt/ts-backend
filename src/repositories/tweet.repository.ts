import mongoose from "mongoose";
import TweetModel from "../database/models/tweet.model";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

export const getTweetRepo = async (tweetId: string): Promise<ITweetInterface | null> => {
    try {
        const tweet = await TweetModel.findOne({ tweetId: tweetId });
        return tweet;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAllTweetRepo = async (tweetId: string): Promise<ITweetInterface | null> => {
    try {
        const tweet = await TweetModel.findOne({ tweetId: tweetId });
        return tweet;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteTweetRepo = async (tweetId: string): Promise<boolean> => {
    try {
        const deleted = await TweetModel.findOneAndDelete({ tweetId: tweetId });
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

export const createTweetRepo = async (tweet: ITweetInterface): Promise<boolean> => {
    try {
        const created = await TweetModel.create({
            tweetId: tweet.tweetId,
            content: tweet.content,
            createdAt: tweet.createdAt,
            adminId: tweet.adminId
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

export const updateTweetRepo = async (tweetId: string, tweet: ITweetInterface): Promise<boolean> => {
    try {
        const updated = await TweetModel.findOneAndUpdate({ tweetId: tweetId }, tweet, { new: true });
        if (updated) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};