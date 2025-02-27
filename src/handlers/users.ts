import express, { Request, Response } from "express";
import { users, Users } from "../models/users";
import jwt from "jsonwebtoken";
import verifyAuthToken from "./utilities/authorization";

const store = new Users();
//Get users
const index = async (req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};
//Get by id
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

//Create new users
const create = async (req: Request, res: Response) => {
  const user: users = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
      throw new Error("TOKEN_SECRET environment variable is not defined");
    }

    const token = jwt.sign({ user: newUser }, secret);

    // res.json(token);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Authenticate users
const authenticate = async (req: Request, res: Response) => {
  const auth = await store.authenticate(req.body.first_name, req.body.password);
  try {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error("TOKEN_SECRET environment variable is not defined");
    }

    var token = jwt.sign({ user: auth }, secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create order for user
const addNewOrder = async (req: Request, res: Response) => {
  const product_id: string = req.body.product_id;
  const users_id: string = req.params.id;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedOrder = await store.addOrderByUser(
      product_id,
      users_id,
      quantity
    );
    res.json(addedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Delete users
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", verifyAuthToken, create);
  app.post("/users/:id/orders", verifyAuthToken, addNewOrder);
  app.post("/users/auth", verifyAuthToken, authenticate);
  app.delete("/users/:id", destroy);
};

export default user_routes;
