import cors from "cors";
import express from "express";
import morgan from "morgan";

import router from "./routes/index.js";
import { initializeKeys } from "./utils/crypto.js";
import ErrorHandler from "./middleware/errorHandler.js";

const app = express();
initializeKeys(); // Initialize keys before starting the server
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
