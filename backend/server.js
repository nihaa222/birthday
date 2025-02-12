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
const corsOptions = {
    origin: ['http://13.61.10.35:3001'], // Allow frontend URL and localhost (if testing locally)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type'], // Allowed headers
  };
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
    console.log("Connected to the database")
}).catch((err) => {
    console.error("Error connecting to the database", err)
})


app.use("/create", createRoute)
app.use("/", getageRoute)
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
