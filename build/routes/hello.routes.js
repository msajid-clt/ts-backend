"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloRouter = (0, express_1.Router)();
// Define route paths
helloRouter.get("/", (req, res) => {
    res.json({ "data": "Server is live and running. So hello to you too!!" });
});
exports.default = helloRouter;
