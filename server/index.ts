import express, { Request, Response } from "express";
import mockMessages from "./mockMessages";
import mockUserDetails from "./mockUserDetails";

const app = express();

app.use(express.json());

app.get("/messages", (req: Request, res: Response) => res.send(mockMessages));
app.get("/user-details", (req: Request, res: Response) =>
  res.send(mockUserDetails)
);

app.listen(4000, () => console.log("listening on port 4000"));
