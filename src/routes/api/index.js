import express from "express";
import friends from "./friends";
import riot from "./riot";
import register from "./register";

const router = express.Router();

router.use("/friends", friends);
router.use("/riot", riot);
router.use("/register", register);

export default router;
