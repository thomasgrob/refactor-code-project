import express from "express";
import { warningDetailController } from "../controllers/warning.detail.controller";

const router = express.Router();

router.get('/:id', warningDetailController);

export default router;