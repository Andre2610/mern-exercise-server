import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CONNECTION_URL, PORT } from "./config/constants.js";

import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";

const app = express();
const jsonParser = express.json({ limit: "30mb" });

app.use(jsonParser);
app.use(cors());

app.use("/posts", postRouter);
app.use("/users", userRouter);

mongoose
  .connect(CONNECTION_URL, {})
  .then(() =>
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
  )
  .catch((err) => console.log("Error", err.message));
