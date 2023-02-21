import express from "express";
import { loadEnv } from "./database/envs";
import authRoutes from "./routes/auth-routes";
import transactionsRoutes from "./routes/transactions-routes";
import usersRoutes from "./routes/users-routes";
import cors from "cors"

loadEnv();

const app = express();

app
 .use(express.json())
 .use(cors())
 .use("/auth", authRoutes)
 .use("/transactions", transactionsRoutes)
 .use("/users", usersRoutes);

export default app;
