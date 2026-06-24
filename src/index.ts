import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./schema";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  // GET hello world
  .get("/", () => ({ message: "Hello World!" }))
  
  // GET all users
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  })
  
  // POST create user
  .post("/users", async ({ body }) => {
    try {
      const result = await db.insert(users).values({
        name: body.name,
        email: body.email,
      });
      return { success: true, message: "User created successfully", insertId: result[0].insertId };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    })
  })
  
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
