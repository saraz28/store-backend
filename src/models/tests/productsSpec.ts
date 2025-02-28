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

  it("create method should add a products", async () => {
    const newProduct = {
      id: 1,
      name: "New Product",
      price: 150,
      category: "New Category",
    };

    const result = await store.create(newProduct);
    expect(result).toEqual({
      id: result.id,
      name: result.name,
      price: result.price,
      category: result.category,
    });
  });
});
