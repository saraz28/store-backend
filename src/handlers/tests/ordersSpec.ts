import express from "express";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Order Routes", () => {
  let app: express.Application;
  beforeEach(() => {
    app = express();
    app.use(express.json());
  });
  describe("GET /orders/", () => {
    it("should get all orders", async () => {
      const response = await request.get("/orders");
      expect(response.status).toBe(200);
    });
  });
  describe("GET /orders/:id", () => {
    it("should get orders by id", async () => {
      const response = await request.get("/orders/1");
      expect(response.status).toBe(200);
    });
  });
  describe("POST /orders/", () => {
    it("should post orders", async () => {
      const response = await request.post("/orders");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: response.body.id,
        user_id: response.body.user_id,
        status: response.body.status,
      });
    });
  });

  describe("POST /orders/", () => {
    it("should add product to orders", async () => {
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

      const orderResponse = await request
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: userResponse.body.id,
          status: "active",
        });

      const orderId = orderResponse.body.id;

      const addProductResponse = await request
        .post(`/orders/${orderId}/products`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: productId,
          quantity: 22,
        });
      expect(addProductResponse.status).toBe(200);
      expect(addProductResponse.body).toEqual({
        id: addProductResponse.body.id,
        order_id: orderId,
        product_id: productId,
        quantity: 22,
      });
    });
  });
  describe("DELETE /orders/", () => {
    it("should delete orders", async () => {
      const response = await request.delete("/orders/1");
      expect(response.status).toBe(200);
    });
  });
});
