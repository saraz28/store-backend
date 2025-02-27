import { Users } from "../users";

const store = new Users();

describe("users model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have an order by user method", () => {
    expect(store.addOrderByUser).toBeDefined();
  });
  it("should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("should have a get order by user method", () => {
    expect(store.getOrderByUser).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("index method should return list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
