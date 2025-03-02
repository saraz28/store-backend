import express, { Request, Response } from "express";
import { orders, Orders } from "../models/orders";

const store = new Orders();

// Get orders
const index = async (req: Request, res: Response) => {
  try {
    const order = await store.index();
    res.json(order);
  } catch (err) {
    throw new Error(`Could not get orderd. Error ${err}`);
  }
};

// Get order by id
const orderById = async (req: Request, res: Response) => {
  try {
    const order = await store.showOrderByID(req.params.id);
    res.json(order);
  } catch (err) {
    throw new Error(`Could not get orders by id. Error ${err}`);
  }
};

// Create order
const create = async (req: Request, res: Response) => {
  try {
    const order: orders = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Create product for order
const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.id;
  const product_id: string = req.body.product_id;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(order_id, product_id, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Delete order
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    throw new Error(`Could not delete orders. Error ${err}`);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", orderById);
  app.post("/orders", create);
  app.post("/orders/:id/products", addProduct);
  app.delete("/orders/:id", destroy);
};

export default order_routes;
