import { db } from "@/db";
import { pages } from "@/db/schema";
import { files } from "@/db/schema";
import { eq } from "drizzle-orm";
import { readFile } from "fs/promises";
import { Blob } from "buffer"; 
import path from "path"

export async function POST(req:Response) {
  try {
    const request = await req.json()
    const pagelink = request.id

    const data = await db.select().from(pages).where(eq(pages.link, pagelink))
    const filename = await db.select().from(files).where(eq(files.filepath, data[0].filepath))
  
    console.log("File name" ,filename)
    const filePath = path.join(process.cwd(), "uploads", data[0].filepath)
    console.log("File path:", filePath);
    const fileBuffer = await readFile(filePath)
    console.log(fileBuffer)
  
    return new Response(fileBuffer, {
      headers : {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename[0].filename}"`
      }
    });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}