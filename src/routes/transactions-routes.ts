import { Router } from "express";
import { createTransaction } from "../controllers/transaction-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-body-middleware";
import { transactionSchema } from "../models/transaction-schema";

const transactionsRoutes = Router();

transactionsRoutes
 .all("/*", authenticateToken)
 .post("", validateBody(transactionSchema), createTransaction);

export default transactionsRoutes;
