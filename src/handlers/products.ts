import express, { Request, Response } from "express";

import { ProductList, Product } from "../models/product";
import jwt from "jsonwebtoken";
import verifyAuthToken from "./utilities/authorization";

const store = new ProductList();

//Get products
const index = async (req: Request, res: Response) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    throw new Error(`Could not get products. Error ${err}`);
  }
};

// Get by id
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    throw new Error(`Could not get products by id. Error ${err}`);
  }
};

// Create products
const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.split(" ")[1];
    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
      throw new Error("TOKEN_SECRET environment variable is not defined");
    }
    jwt.verify(token, secret);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// Delete products
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    throw new Error(`Could not delete products. Error ${err}`);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", destroy);
};
export default product_routes;
