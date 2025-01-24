import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv"
import createRoute from "./routes/create.route.js"
import getageRoute from "./routes/getage.route.js"
import cors from "cors"
dotenv.config()

const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
    console.log("Connected to the database")
}).catch((err) => {
    console.error("Error connecting to the database", err)
})


app.use("/create", createRoute)
app.use("/", getageRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
