import { db } from "@/db";
import { pages } from "@/db/schema";
import { content } from "@/db/schema";
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
      text: content.text,
      filenames: content.filenames,
      filepaths: content.filepaths
    })
      .from(pages)
      .leftJoin(content, eq(pages.fileid, content.id))
      .where(eq(pages.link, pagelink))
    console.log(data);
    if (data.length === 0) {
      console.log("File not found")
      return Response.json({
        success: false,  reason: "filenotfound"
      })
    }

    if (data[0].type === "text") {
      return Response.json({
        success: true,
        type: "text",
        text: data[0].text
      })
    }
    else if (data[0].type === "file" && data[0].filepaths) {
      // const filePaths = []
      const files = [];
      for (let i = 0; i < data[0].filepaths.length; i++)
      {
        const filePath = path.join(process.cwd(), "uploads", data[0].filepaths[i])
        const fileName = data[0].filenames?.[i]
        // data[0].filepaths.forEach((filepath) => {
          // filePaths.push(path.join(process.cwd(), "uploads", filepath))
        // })

        try{
          const fileBuffer = await readFile(filePath)
          files.push({
            filename : fileName,
            filePath : filePath,
            fileData: fileBuffer.toString('base64'),
            size : fileBuffer.length,
          })
        }
        catch (err){
          console.error(`Error reading file ${data[0].filepaths[i]}:`, err);
        }
      }
      // console.log("workin")

      return Response.json({
        success: true,
        type: "file",
        files: files,
        count : files.length
      })
    }
    else {
      return Response.json({ success: false, error: "Type not found 1" })
    }

  } catch (err: any) {
    // console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}