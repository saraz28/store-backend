// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";

export type users = {
  id?: number;
  first_name: string;
  last_name: string;
  password: number;
};
const pepper = process.env.BCRYPT_PASSWORD || "";
const saltRounds = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

export class Users {
  async index(): Promise<users[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<users[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async create(user: users): Promise<users> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name , password) VALUES ($1,$2,$3)  RETURNING *";
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      const users = result.rows[0];
      conn.release();
      return users;
    } catch (err) {
      throw new Error(
        `Could not add new users ${user.first_name}. Error ${err}`
      );
    }
  }

  async authenticate(
    first_name: string,
    password: string
  ): Promise<users | null> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT password FROM users WHERE first_name=($1)";
      const result = await conn.query(sql, [first_name]);
      console.log(password + pepper);
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(user);
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async addOrderByUser(
    product_id: string,
    users_id: string,
    quantity: number
  ): Promise<users> {
    try {
      const sql =
        "INSERT INTO users_orders (product_id, users_id, quantity) VALUES ($1,$2,$3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [product_id, users_id, quantity]);
      const Addorder = result.rows[0];
      conn.release();
      return Addorder;
    } catch (err) {
      throw new Error(`Could not add new order. Error ${err}`);
    }
  }

  async getOrderByUser(user: users): Promise<users> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name , password) VALUES ($1,$2,$3)  RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.password,
      ]);
      const users = result.rows[0];
      conn.release();
      return users;
    } catch (err) {
      throw new Error(
        `Could not add new users ${user.first_name}. Error ${err}`
      );
    }
  }

  async delete(id: string): Promise<users> {
    try {
      const sql = "DELETE from users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete users ${id}. Error: ${err}`);
    }
  }
}
