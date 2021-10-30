import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { CONNECTION_URL } from "./config/constants";

const app = express();
const jsonParser = express.json();

app.use(jsonParser);
app.use(cors());
