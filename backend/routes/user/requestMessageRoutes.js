import { createRequestMessage } from "../../controllers/user/requestMessageController.js";
import { protectRoute } from "../../middleware/authMiddleware.js";
import express from "express";

const requestMessageRoutes = express.Router();

requestMessageRoutes.post("/sendRequest-message", protectRoute, createRequestMessage);

export default requestMessageRoutes;