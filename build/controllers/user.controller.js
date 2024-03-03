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
exports.updateUserController = exports.deleteUserController = exports.createUserController = exports.getUserController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const user_model_1 = __importDefault(require("../database/models/user.model"));
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield (0, user_repository_1.getUserRepo)(userId);
        if (user) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(500).json({ error: "User not found!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.getUserController = getUserController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.default({
        uid: req.body.uid,
        tweets: req.body.tweets,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        createdAt: new Date()
    });
    try {
        const success = yield (0, user_repository_1.createUserRepo)(user);
        if (success) {
            res.status(200).json({ data: user });
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
exports.createUserController = createUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const success = yield (0, user_repository_1.deleteUserRepo)(userId);
        if (success) {
            res.status(200).json({ "data": "User deleted" });
        }
        else {
            res.status(500).json({ "error": "User not deleted!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.deleteUserController = deleteUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.body;
    try {
        const success = yield (0, user_repository_1.updateUserRepo)(userId, user);
        if (success) {
            res.status(200).json({ data: user });
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
exports.updateUserController = updateUserController;
