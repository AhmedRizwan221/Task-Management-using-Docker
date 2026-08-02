import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// load env variables 
dotenv.config({
    path: './.env'
})
// console.log(process.env.PORT);

// create app using express
const app = express();

// use cross origin request 
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// import routes here 
import TaskRoute from "./routes/task.route.js";
import errorHandler from "./middleware/error.middleware.js";

// initialize routes here 
app.use('/api/v1/task', TaskRoute);


app.get('/', (req, res) => {
    res.json("Server is running")
})

// error middleware 
app.use(errorHandler);
// export app 
export default app;