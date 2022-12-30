import express, { Request, Response } from "express";
import mockMessages from "./mockMessages";
import mockUserDetails from "./mockUserDetails";
import cors from "cors";
// import { request } from "http";
import { Message } from "./types/message";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(express.json());

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`using the app hosted on port ${port}`);
});

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
  //generate new array with id and name out of the existing DB
  const usersNameID = mockUserDetails.map((user) => {
    const { id, name } = user;
    return { id, name };
  });
  res.send(usersNameID);
});

app.get("/getUserDetails/:id", (req: Request, res: Response) => {
  //using params and filter to get requested id
  const { id } = req.params;
  //adding casting (+) as user.id is a number
  const user = mockUserDetails.filter((user) => user.id === +id);
  res.send(user);
});

app.post("/addNewMessage", bodyParser.json(), (req: Request, res: Response) => {
  //adding new Message to the server DB to keep the msg
  //request includes authorId, id, message(body) and timestamp(date+time) that will be converted in the app.ts component.
  //add likes array
  // const newMessage = req.body;
  // const {authorId, id, body, timestamp} = newMessage
  const authorId = req.body.authorId;
  const id = req.body.id;
  const body = req.body.body;
  const timestamp = req.body.timestamp;
  const likes = [];
  mockMessages.push({ authorId, id, body, timestamp, likes });
  res.status(201).send({ message: "Message was created successfully" });
});

app.post(
  "/changeMessageLikes",
  bodyParser.json(),
  (req: Request, res: Response) => {
    const changeLikeStatusEvent = req.body;
    // console.log(changeLikeStatusEvent);
    const { messageId, userId, like } = changeLikeStatusEvent;
    let messageToUpdate = mockMessages.filter(
      (message) => message.id === messageId
    );
    //need to complete the logic
  }
);

app.listen(port, () => console.log(`listening on port ${port}`));
