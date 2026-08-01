import app from "./app.js";
import { connectMongoDB } from "./db/index.js";


connectMongoDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Database is connected on ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Mongo db connection error")
})