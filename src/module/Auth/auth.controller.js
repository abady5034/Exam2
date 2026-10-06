import { Router } from "express";
import { getNewToken, login, signup } from "./auth.service.js";

const router = Router();

router.get("/Check-Health", async (req, res) => {
  res.json("Done From Auth.controller.js");
});

router.post("/signup", async (req, res) => {
  let data = await signup(req.body);
  res.json(data)
});

router.post("/login", async (req, res) => {
  let data = await login(req.body);
  res.json(data)
});

router.post("/get-new-token", async (req, res) => {
  let data = await getNewToken(req.body);
  res.json(data)
})
export default router;
