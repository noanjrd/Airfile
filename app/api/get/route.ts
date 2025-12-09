import { db } from "@/db";
import { pages } from "@/db/schema";
import { files } from "@/db/schema";
import { eq } from "drizzle-orm";
import { readFile } from "fs/promises";
import path from "path"

export async function POST(req: Request) {
  try {
    const request = await req.json()
    const pagelink = request.id

    const data = await db.select({
      pageLink: pages.link,
      type: pages.type,
      fileId: pages.fileid,
      text: files.text,
      filename: files.filename,
      filepath: files.filepath
    })
      .from(pages)
      .leftJoin(files, eq(pages.fileid, files.id))
      .where(eq(pages.link, pagelink))
    console.log(data);
    if (data.length === 0) {
      console.log("File not found")
      return Response.json({
        success: "false", reason: "filenotfound"
      })
    }

    if (data[0].type == "text") {
      return Response.json({
        success : true,
        type : "text",
        text : data[0].text
      })
    }
    else if (data[0].type == "file" && data[0].filepath) {
      const filePath = path.join(process.cwd(), "uploads", data[0].filepath)
      console.log("File path:", filePath);
      const fileBuffer = await readFile(filePath)
      console.log(fileBuffer)

      return Response.json({
        success : true,
        type : "file",
        filename : data[0].filename,
        fileData: fileBuffer.toString('base64')
      })
    }
    else
    {
      return Response.json({ success: false, error: "Type not found" })
    }

  } catch (err: any) {
    // console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}