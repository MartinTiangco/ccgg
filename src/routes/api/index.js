import express from "express";
import friends from "./friends";
import riot from "./riot";
import register from "./register";
import settings from "./settings";

const router = express.Router();

router.use("/friends", friends);
router.use("/riot", riot);
router.use("/register", register);
router.use("/settings", settings);

export default router;
