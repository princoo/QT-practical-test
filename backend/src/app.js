import cors from "cors";
import express from "express";
import morgan from "morgan";

import ErrorHandler from "./middleware/errorHandler.middleware";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
