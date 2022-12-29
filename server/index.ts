import express, { Request, Response } from "express";
import mockMessages from "./mockMessages";
import mockUserDetails from "./mockUserDetails";
// import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/messages", (req: Request, res: Response) => res.send(mockMessages));

app.get("/user-details", (req: Request, res: Response) =>
  res.send(mockUserDetails)
);

app.listen(port, () => console.log(`listening on port ${port}`));
