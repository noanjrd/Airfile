import { db } from "@/db";
import { pages } from "@/db/schema";

// BIEN COMPRENDRE LES REQUETES API ENTRE LE BACK ET LE FRONT

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await db.insert(pages).values(
        {
            filepath : body.filepath,
            link : body.link,
        }
    )
    return Response.json({ success: true });
  } catch (err: any)
  {
    console.error(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}