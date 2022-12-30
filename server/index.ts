import express, { Request, Response } from "express";
import mockMessages from "./mockMessages";
import mockUserDetails from "./mockUserDetails";
import cors from "cors";
import { request } from "http";
import { Message } from "./types/message";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(express.json());

// app.use(cors({ origin: "http://localhost:5173" }));

app.get("/messages", (req: Request, res: Response) => res.send(mockMessages));

app.get("/getMessages", (req: Request, res: Response) => {
  //add authorName using the same function from hooks/server-requests
  const mockMessagesWithNames = mockMessages.map((message: Message) => {
    const author = mockUserDetails.find((user) => user.id === message.authorId);
    const authorName = author && author.name;

    return { ...message, authorName };
  });
  res.send(mockMessagesWithNames);
});

app.get("/user-details", (req: Request, res: Response) =>
  res.send(mockUserDetails)
);

app.get("/getUsers", (req: Request, res: Response) => {
  const usersNameID = mockUserDetails.map((user) => {
    const { id, name } = user;
    return { id, name };
  });
  res.send(usersNameID);
});

app.get("/getUserDetails/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  //adding casting (+) as user.id is a number
  const user = mockUserDetails.filter((user) => user.id === +id);
  res.send(user);
});

app.listen(port, () => console.log(`listening on port ${port}`));
