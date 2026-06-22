import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import petsRouter from "./routes/petsRouter";
import productRoutes from "./routes/petFood";
import userRoute from "./routes/userRoute";
import basketRoutes from "./routes/basketRoutes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use("/api/pets", petsRouter);

app.use("/api/products", productRoutes);

app.use("/api/users", userRoute);

app.use("/api/baskets", basketRoutes);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
