import { Router, Request, Response } from "express";

const helloRouter = Router();
// Define route paths
helloRouter.get("/", (req: Request, res: Response) => {
    res.json ({"data" : "Server is live and running. So hello to you too!!"});
});

export default helloRouter;