import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri = process.env.DATABASE_URL || "mysql://root:password@127.0.0.1:3306/aplikasi_eam";

// Create a database connection pool
export const pool = mysql.createPool(connectionUri);

// Create the Drizzle ORM client using the pool
export const db = drizzle(pool, { schema, mode: "default" });
