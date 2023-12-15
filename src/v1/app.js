require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const { connectDB, connectMGDB } = require("./model/db");
const userRouter = require("./routes/userRouter");
const kesmeRouter= require("./routes/kesmeRouter");
const orderRouter= require("./routes/orderRouter");

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "2mb" }));


const PORT = process.env.APP_PORT || 4900;
app.set("port", PORT);

app.use("/user", userRouter);
app.use("/kesme", kesmeRouter);
app.use("/order", orderRouter);


app.listen(PORT, async () => {
  try {
    connectDB().then(() => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});
