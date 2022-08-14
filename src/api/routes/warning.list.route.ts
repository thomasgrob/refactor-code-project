import express from "express";

import warningListController from "../controllers/warning.list.controller";

const router = express.Router();

router.get('/:state', warningListController);

export default router;