import { ProductList } from "./../product";

const store = new ProductList();

describe("Proudct model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("index method should return list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      { name: "Test Product", price: 100, catergory: "Test Category" },
    ]);
  });
});
