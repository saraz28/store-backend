import express from "express";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Users Api", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe("GET /users", () => {
    it("should fetch all users", async () => {
      const response = await request.get("/users");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /users/:id", () => {
    it("should fetch users by id", async () => {
      const response = await request.get("/users/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        first_name: "sara",
        last_name: "m",
        password:
          "$2b$10$l/Sq7itBpn65JoI/BHwCLedsJK7VGxzwIy4qF1d3H7Du0FIqjKFLy",
      });
    });
  });

  describe("POST /users/", () => {
    it("should post users", async () => {
      const response = await request.post("/users");
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        token: response.body.token,
      });
    });
  });

  describe("POST /users/", () => {
    it("should add new orders", async () => {
      const response = await request.post("/users/1/orders");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: response.body.id,
        product_id: response.body.product_id,
        user_id: response.body.user_id,
        quantity: response.body.quantity,
      });
    });
  });

  describe("POST /users/", () => {
    it("should add order from users", async () => {
      const userResponse = await request.post("/users").send({
        first_name: "sara",
        last_name: "m",
        password:
          "$2b$10$l/Sq7itBpn65JoI/BHwCLedsJK7VGxzwIy4qF1d3H7Du0FIqjKFLy",
      });
      const token = userResponse.body.token;
      const productResponse = await request
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New Product",
          price: 150,
          category: "New Category",
        });
      const productId = productResponse.body.id;
      const response = await request
        .post(`/users/1/orders`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: productId,
          quantity: 22,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: response.body.id,
        product_id: productId,
        user_id: 1,
        quantity: 22,
      });
    });
  });

  describe("GET /users/auth", () => {
    it("should authenticate user", async () => {
      const response = await request.post("/users/auth").send({
        first_name: "sara",
        password:
          "$2b$10$l/Sq7itBpn65JoI/BHwCLedsJK7VGxzwIy4qF1d3H7Du0FIqjKFLy",
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy("token");
    });
  });
});
