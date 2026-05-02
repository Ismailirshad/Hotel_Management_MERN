import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/user/authRoutes.js";
import hotelRouter from "./routes/user/hotelRoutes.js";
import roomRouter from "./routes/user/roomRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/admin/adminRoutes.js";
import offerRouter from "./routes/user/offerRoutes.js";
import bookingRouter from "./routes/user/bookingRoutes.js";
import paymentRouter from "./routes/user/paymentRoutes.js";
import session from "express-session";
import passport from "passport";
import './config/passport.js'
import superAdminRouter from "./routes/superAdmin/superAdminRoutes.js";
import requestMessageRoutes from "./routes/user/requestMessageRoutes.js";

const app = express();
const PORT = process.env.PORT;
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.listen(PORT, "0.0.0.0", async () => {
  console.log("Server connected", PORT);
  await connectDb();
});

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send("Backend working!");
});
app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/offers", offerRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/superAdmin", superAdminRouter);
app.use("/api/request", requestMessageRoutes);
