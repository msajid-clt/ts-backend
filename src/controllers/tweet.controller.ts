import e, { Request, Response } from 'express';
import { getTweetRepo, createTweetRepo, deleteTweetRepo, updateTweetRepo } from "../repositories/tweet.repository";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import TweetModel from '../database/models/tweet.model';
import { removeTweetIdFromUserRepo, updateUserWithTweetIdRepo } from '../repositories/user.repository';

export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            res.status(200).json({data: tweet});
        } else {
            res.status(500).json({"error": "Tweet not found!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const getAllTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            res.status(200).json({"data": tweet});
        } else {
            res.status(500).json({"error": "Tweet not found!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const createTweetController = async (req: Request, res: Response) => {
    const tweet:ITweetInterface = new TweetModel({
        tweetId: req.body.tweetId,
        content: req.body.content,
        createdAt: new Date(),
        adminId: req.body.adminId
    });

    try {
        const success = await createTweetRepo(tweet);
        if (success) {
            // update the user with the tweet
            const userLinked = await updateUserWithTweetIdRepo(tweet.adminId, tweet.tweetId);
            if (userLinked) {
                res.status(200).json({data: tweet});
            } else {
                res.status(500).json({error: "Error occurred while updating user!"});
            }
        } else {
            res.status(500).json({"error": "Error occured while creating!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const deleteTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId);
        if (tweet) {
            const removeTweet = await removeTweetIdFromUserRepo(tweet.adminId, tweetId);
            if (removeTweet) {
                const success = await deleteTweetRepo(tweetId);
                if (success) {
                    console.log('Tweet deleted; User updated!')
                    res.status(200).json({"data": "Tweet deleted"});
                } else {
                    console.log('Error in deleting tweet')
                    res.status(500).json({error: "Error in deleting tweet"});
                }
            } else {
                console.log ('Error in removing tweet in user')
                res.status(500).json({error: "Error in removing tweet in user"});
            }
        } else {
            console.log('Error in fetching tweet')
            res.status(500).json({error: "Error in fetching tweet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

export const updateTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;
    const tweet:ITweetInterface = req.body;
    try {
        const success = await updateTweetRepo(tweetId, tweet);
        if (success) {
            res.status(200).json({data: tweet});
        } else {
            res.status(500).json({"error": "Error occured while updating!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": error});
    }
}

