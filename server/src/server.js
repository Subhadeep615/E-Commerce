import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("error", err)
            throw err
        })
        app.get('/',(req, res) => res.send("API is Working"));
        app.listen(process.env.PORT || 4200, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed!!!", err)
    })