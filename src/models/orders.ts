// @ts-ignore
import client from "../database";

export type orders = {
  id?: number;
  user_id: number;
  status: string;
};

export class Orders {
  async index(): Promise<orders[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async show(status: string): Promise<orders[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE status=$1";
      const result = await conn.query(sql, [status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get orders by ${status} status. Error: ${err}`
      );
    }
  }
  async showOrderByID(id: string): Promise<orders[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get orders by ${id}. Error: ${err}`);
    }
  }
  async create(order: orders): Promise<orders> {
    try {
      const sql =
        "INSERT INTO orders (user_id , status) VALUES ($1,$2)  RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [order.user_id, order.status]);
      const Addorder = result.rows[0];
      conn.release();
      return Addorder;
    } catch (err) {
      throw new Error(`Could not add new order ${order.id}. Error ${err}`);
    }
  }
  async addProduct(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<orders> {
    try {
      const sql =
        "INSERT INTO order_items (order_id, product_id , quantity) VALUES ($1,$2,$3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(
        `Could not add new product ${product_id} to order ${order_id} Error ${err}`
      );
    }
  }

  async delete(id: string): Promise<orders> {
    try {
      const sql = "DELETE from orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const orders = result.rows[0];
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not delete orders ${id}. Error: ${err}`);
    }
  }

}
