import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import product_routes from "./handlers/products";
import order_routes from "./handlers/orders";
import user_routes from "./handlers/users";

const app: express.Application = express();
const address: string = "127.0.0.1:3000";
const corsOptions = {
  origin: "http://127.0.0.1",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

product_routes(app);
order_routes(app);
user_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
