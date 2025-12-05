import { db } from "@/db";
import { pages } from "@/db/schema";

export async function GET()
{
    // await db.insert(pages).values({ filepath: "coucou", link :"coucou" }).run();
    const data = await db.select().from(pages).all()
    return Response.json(data);

    // id: integer("id").primaryKey({ autoIncrement: true }),
//   filepath: text("filepath").notNull(),
//   link: text("link").notNull(),
}