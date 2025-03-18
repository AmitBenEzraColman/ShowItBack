import env from "dotenv";
env.config();
import express, {Express} from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import authRoute from "./routes/auth_route";
import userRoute from "./routes/user_route";
import geminiRoute from "./routes/ai_gemini_route";
import tvShowRoute from "./routes/tv_show_route";
import reviewRoute from "./routes/review_route";
import commentRoute from "./routes/comment_route";
import fileRoute from "./routes/file_route";
import path from "node:path";


const initApp = (): Promise<Express> => {
    return new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const dbUrl = process.env.DB_URL;
        mongoose.connect(dbUrl!).then(() => {
            const app = express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));
            const corsOptions = {
                origin:
                    process.env.NODE_ENV !== "production"
                        ? `http://${process.env.DOMAIN_BASE}:${process.env.FRONTEND_PORT}`
                        : `https://${process.env.DOMAIN_BASE}`,
                credentials: true,
            };
            console.log(corsOptions.origin)
            app.use(cors(corsOptions));
            app.use(cookieParser());
            app.use(express.static("front"));
            app.use("/public", express.static("public"));
            app.use("/auth", authRoute);
            app.use("/users", userRoute);
            app.use("/gemini", geminiRoute);
            app.use("/tvshows", tvShowRoute);
            app.use("/reviews", reviewRoute);
            app.use("/comments", commentRoute);
            app.use("/file", fileRoute);



            resolve(app);
        });
    });
};

export default initApp;