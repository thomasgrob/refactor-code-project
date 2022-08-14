import express from "express";

// Import all api routes
import warningList from "./warning.list.route";
import warningDetail from "./warning.detail.route";

const router = express.Router();

// Warning list route - /api/list/
router.use('/list', warningList);

// Warning details route - /api/warning/
router.use('/warning', warningDetail);

export default router;