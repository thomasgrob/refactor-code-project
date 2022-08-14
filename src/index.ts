import express from "express";
import compression from "compression";
const logger = require("./logger.ts");

import routes from "./api/routes";

// Initiate app
const app = express();
app.use(compression());
const port = process.env.PORT || 3000;

// Mount the api routes
app.use('/api', routes);

// Start API on declared port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});