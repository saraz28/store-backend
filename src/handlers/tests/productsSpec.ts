import express from "express";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Products Api", () => {
  let app: express.Application;
  beforeEach(() => {
    app = express();
    app.use(express.json());
  });
  describe("GET /products", () => {
    it("should fetch all products", async () => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /products/:id", () => {
    it("should fetch products by id", async () => {
      const response = await request.get("/products/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "New Product",
        price: 150,
        category: "New Category",
      });
    });
  });

  describe("POST /products/", () => {
    it("should post products", async () => {
      const userResponse = await request.post("/users").send({
        first_name: "sara",
        last_name: "m",
        password:
          "$2b$10$l/Sq7itBpn65JoI/BHwCLedsJK7VGxzwIy4qF1d3H7Du0FIqjKFLy",
      });
      const token = userResponse.body.token;

      const response = await request
        .post("/products")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: response.body.id,
        name: response.body.name,
        price: response.body.price,
        category: response.body.category,
      });
    });
  });
  describe("DELETE /products/", () => {
    it("should delete products", async () => {
      const response = await request.delete("/products/1");
      expect(response.status).toBe(200);
    });
  });
});
