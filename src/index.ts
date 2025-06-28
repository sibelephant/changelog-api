import express from "express";
import * as dotenv from "dotenv";
import Routes from "../src/routes/router";
import morgan from 'morgan'
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";


dotenv.config();
const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080;

app.use("/api", protect, Routes);
app.post("/user", createNewUser);
app.post("/signin", signin);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
