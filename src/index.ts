import express, { Express } from "express";
import http from "http";
import cors from "cors";
import { config } from 'dotenv';
import bodyParser from "body-parser";
import router from "./routes/routes";
import mongoose from "mongoose";
import { error } from "console";


const app: Express = express();
const server = http.createServer(app);

config();

// Express Configurator
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");


// Define the routes
app.use("/api/v1", router);

// Get MongoDB URI
const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
    console.error("MongoDB URI is not defined:" + MONGO_DB_URI);
    process.exit(1);
}
// Connect to MongoDB
mongoose.connect(MONGO_DB_URI, {}).then(() => {
    console.log("Connection to MongoDB is successful");
}).catch((error)=> {
    console.log(error);
})
// Start the server
try {
    const port:Number = app.get("PORT")
    const baseURL:String = app.get("BASE_URL")
    server.listen(port, (): void => {
        console.log("Server is listening")
    })

} catch (error) {
    console.log(error);
}