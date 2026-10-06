import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware.js";
import { createBooking, getAllBooking, upadateBooking } from "./booking.service.js";

const router = Router();

router.get("/Check-Health", (req, res) => {
  res.json("Done From booking.controller.js");
});

router.post("/", auth, async (req, res) => {
  let data = await createBooking(req.body, req.user)
  res.json(data)
})

router.get("/", auth, async (req, res) => {
  let data = await getAllBooking(req.user)
  res.json(data)
})

router.put("/:id", auth, async (req, res) => {
  let data = await upadateBooking(req.params, req.body, req.user)
  res.json(data)
})


export default router;
