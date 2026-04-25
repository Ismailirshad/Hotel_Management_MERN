import express from "express";
import { createRequestMessage } from "../../controllers/user/requestMessageController.js";
import { protectRoute } from "../../middleware/authMiddleware.js";

const requestMessageRoutes = express.Router();

requestMessageRoutes.post("/sendRequest-message", protectRoute, createRequestMessage);

export default requestMessageRoutes;