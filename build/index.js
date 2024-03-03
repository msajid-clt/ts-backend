"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, dotenv_1.config)();
// Express Configurator
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");
// Define the routes
app.use("/api/v1", routes_1.default);
// Get MongoDB URI
const MONGO_DB_URI = process.env.MONGO_DB_URI;
if (!MONGO_DB_URI) {
    console.error("MongoDB URI is not defined:" + MONGO_DB_URI);
    process.exit(1);
}
// Connect to MongoDB
mongoose_1.default.connect(MONGO_DB_URI, {}).then(() => {
    console.log("Connection to MongoDB is successful");
}).catch((error) => {
    console.log(error);
});
// Start the server
try {
    const port = app.get("PORT");
    const baseURL = app.get("BASE_URL");
    server.listen(port, () => {
        console.log("Server is listening");
    });
}
catch (error) {
    console.log(error);
}
