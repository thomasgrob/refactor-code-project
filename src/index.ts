import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import routes from "./api/routes";
import errorHandler from "./api/middlewares/error";
const logger = require("./api/utils/logger");

// Initiate app
const app = express();
const port = process.env.PORT || 3000;

// Use gzip compression for faster responses
app.use(compression());
app.use(helmet());
app.use(cors());

// Mount the api routes
app.use('/api', routes);

// General error handler middleware
app.use(errorHandler);

// Start API on declared port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});