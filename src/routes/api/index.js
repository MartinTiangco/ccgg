import express from "express";
import friends from "./friends";
import riot from "./riot";

const router = express.Router();

router.use("/friends", friends);
router.use("/riot", riot);

export default router;
