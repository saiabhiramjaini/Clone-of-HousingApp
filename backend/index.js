const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/connect");
const userRouter = require("./routes/user");
const realtorRouter = require("./routes/realtor");
const propertiesRouter = require("./routes/property");
const notificationsRouter = require("./routes/notifications");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json({ limit: '10mb' })); // to resolve payload large error
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(errorHandler)
app.use("/user",userRouter);
app.use("/realtor",realtorRouter);
app.use("/properties",propertiesRouter);
app.use("/notifications",notificationsRouter);

try{
    connectDB(process.env.MONGO_URI);
}catch(e){
    console.log(e);
}

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port "+ process.env.PORT)
})