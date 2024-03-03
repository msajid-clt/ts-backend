"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTweetController = exports.deleteTweetController = exports.createTweetController = exports.getAllTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const tweet_model_1 = __importDefault(require("../database/models/tweet.model"));
const user_repository_1 = require("../repositories/user.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({ data: tweet });
        }
        else {
            res.status(500).json({ "error": "Tweet not found!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.getTweetController = getTweetController;
const getAllTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet) {
            res.status(200).json({ "data": tweet });
        }
        else {
            res.status(500).json({ "error": "Tweet not found!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.getAllTweetController = getAllTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = new tweet_model_1.default({
        tweetId: req.body.tweetId,
        content: req.body.content,
        createdAt: new Date(),
        adminId: req.body.adminId
    });
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (success) {
            // update the user with the tweet
            const userLinked = yield (0, user_repository_1.updateUserWithTweetIdRepo)(tweet.adminId, tweet.tweetId);
            if (userLinked) {
                res.status(200).json({ data: tweet });
            }
            else {
                res.status(500).json({ error: "Error occurred while updating user!" });
            }
        }
        else {
            res.status(500).json({ "error": "Error occured while creating!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.createTweetController = createTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const success = yield (0, tweet_repository_1.deleteTweetRepo)(tweetId);
        if (success) {
            res.status(200).json({ "data": "Tweet deleted" });
        }
        else {
            res.status(500).json({ "error": "Tweet not deleted!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.deleteTweetController = deleteTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.updateTweetRepo)(tweetId, tweet);
        if (success) {
            res.status(200).json({ data: tweet });
        }
        else {
            res.status(500).json({ "error": "Error occured while updating!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.updateTweetController = updateTweetController;
