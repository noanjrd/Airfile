import { db } from "@/db";
import { pages } from "@/db/schema";
import { content } from "@/db/schema";
import { eq } from "drizzle-orm";
import { readFile } from "fs/promises";
import path from "path"
import { lt } from "drizzle-orm";
import { unlink } from "fs/promises";

async function deleteAuto() {
  const period = Number(process.env.NEXT_PUBLIC_EXPIRATION_FILES_TIME)
  const now = Date.now()
  const limit = new Date(now - period)
  const allfiles = await db.select().from(content).where(lt(content.createdAt, limit)) //lt = less than
  for (const el of allfiles) {
    if (el.filepaths) {
      for (const filepath of el.filepaths) {
        const fullPath = path.join(process.cwd(), 'uploads', filepath)
        try {
          await unlink(fullPath)
        } catch (err) {
          console.error(err)
        }

      }
    }
  }
  await db.delete(pages).where(lt(pages.createdAt, limit))
  await db.delete(content).where(lt(content.createdAt, limit))
}


export async function POST(req: Request) {

  await deleteAuto()
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
      return Response.json({
        success: false, reason: "No file found"
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
      const files = [];
      for (let i = 0; i < data[0].filepaths.length; i++) {
        const filePath = path.join(process.cwd(), "uploads", data[0].filepaths[i])
        const fileName = data[0].filenames?.[i]
     

        try {
          const fileBuffer = await readFile(filePath)
          files.push({
            filename: fileName,
            filePath: filePath,
            fileData: fileBuffer.toString('base64'),
            size: fileBuffer.length,
          })
        }
        catch (err) {
          console.error(`Error reading file ${data[0].filepaths[i]}:`, err);
        }
      }

      return Response.json({
        success: true,
        type: "file",
        files: files,
        count: files.length
      })
    }
    else {
      return Response.json({ success: false, error: "Type not found 1" })
    }

  } catch (err: any) {
    return Response.json({ success: false, error: err.message });
  }

}