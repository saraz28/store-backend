import { Orders } from "../orders";

const store = new Orders();

describe("orders model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a add product method", () => {
    expect(store.addProduct).toBeDefined();
  });
  it("should have a show order by id method", () => {
    expect(store.showOrderByID).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("index method should return list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
