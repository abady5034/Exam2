import express from "express";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./module/Auth/auth.controller.js";
import bookingRouter from "./module/Booking/booking.controller.js";
import { globalError } from "./common/index.js";

const app = express();
const port = env.port;

databaseConnection();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use(globalError);

app.get("/", (req, res) => {
  res.json("Done from main.js");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
