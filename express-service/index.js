import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", customerRoutes, foodRoutes, transactionRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server shutting down...");
    process.exit(0);
  });
});
