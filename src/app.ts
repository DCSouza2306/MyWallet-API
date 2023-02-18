import express from "express";
import { loadEnv } from "./database/envs";
import authRoutes from "./routes/auth-routes";
import transactionsRoutes from "./routes/transactions-routes";

loadEnv();

const app = express();

app.use(express.json()).use("/auth", authRoutes).use("/transactions", transactionsRoutes);

export default app;
