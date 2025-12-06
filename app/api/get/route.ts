import { db } from "@/db";
import { pages } from "@/db/schema";

export async function GET() {
  try {
    // Remove .all() - it doesn't exist in Drizzle
    const data = await db.select().from(pages);
    return Response.json(data);
  } catch (err: any) {
    console.error(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}