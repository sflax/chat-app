import express, { Request, Response } from "express";
import mockMessages from "./mockMessages";
import mockUserDetails from "./mockUserDetails";
import cors from "cors";
import { request } from "http";

const app = express();
const port = 4000;

app.use(express.json());

// app.use(cors({ origin: "http://localhost:5173" }));

app.get("/messages", (req: Request, res: Response) => res.send(mockMessages));

app.get("/getMessages", (req: Request, res: Response) => {
  mockMessages.map((message) => {});
});

app.get("/user-details", (req: Request, res: Response) =>
  res.send(mockUserDetails)
);

app.get("/getUsers", (req: Request, res: Response) => {
  const usersNameID = mockUserDetails.map((user) => {
    const id = user.id;
    const name = user.name;
    return { id, name };
  });
  res.send(usersNameID);
});

app.listen(port, () => console.log(`listening on port ${port}`));
