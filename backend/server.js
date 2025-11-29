import express from "express"; 
import authRouter from "./routes/authRoutes.js";
import connectDb from "./config/db.js";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json())


const PORT = 3000;

app.use('/api/auth', authRouter )
app.use('/api/hotel', hotelRoutes)


app.listen(PORT, async () => {
    console.log("Server connected", PORT)
    await connectDb();
})
