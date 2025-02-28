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

 it("create method should add a orders", async () => {
   const newOrder = {
     id: 1,
     status: "active",
     user_id: 1,
   };

   const result = await store.create(newOrder);
   expect(result).toEqual({
     id: result.id,
     status: result.status,
     user_id: result.user_id,
   });
 });
});
