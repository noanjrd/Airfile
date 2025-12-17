import { db } from "@/db";
import { content, pages } from "@/db/schema";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

function generateRandomString(length: number) {
    const choices: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * choices.length)
        result += choices[randomIndex]
    }
    return result
}

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const typedata = data.get("type") as string
        const max_size = Number(process.env.NEXT_PUBLIC_MAX_SIZE_FILES_BYTES || '104857600')
        if (typedata === "text") {
            const textinput = data.get("textinput") as string
            const [inserteddata] = await db.insert(content).values({
                text: textinput
            }).returning({ id: content.id })
            const pagelink = generateRandomString(5)
            await db.insert(pages).values({
                fileid: inserteddata.id,
                link: pagelink,
                type: "text"
            })
            return Response.json({ sucess: true, link: pagelink })
        }
        if (typedata === "file") {
            let filesdata = data.getAll("files")
            const filenamestemp = []
            const filepathstemp = []
            if (!filesdata)
            {
                return Response.json(
                    {
                        success : false,
                        error : "No file found"
                    }
                )
            }
            for (const file of filesdata) {
                if (file instanceof File) {

                    if (file.size > max_size) {
                        return Response.json(
                            {
                                success: false,
                                error: "File '" + file.name + "' too heavy"
                            }
                        )
                    }
                    const arrayBuffer = await file.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer)
                    if (!existsSync("./uploads")) {
                        await mkdir("./uploads")
                    }
                    const extension = path.extname(file.name).toLowerCase()
                    if (!extension) {
                        extension == ".bin"
                    }
                    const iDfile = crypto.randomUUID()
                    await writeFile("./uploads/" + iDfile + extension, buffer)

                    filepathstemp.push(iDfile + extension)
                    filenamestemp.push(file.name)
                }

            }

            const [insertedFile] = await db.insert(content).values(
                {
                    filenames: filenamestemp,
                    filepaths: filepathstemp,
                }
            ).returning({ id: content.id })
            const pagelink = generateRandomString(5)
            await db.insert(pages).values(
                {
                    link: pagelink,
                    fileid: insertedFile.id,
                    type: "file"
                },
            )
            return Response.json({ sucess: true, link: pagelink })
        }
        return Response.json({ sucess: false })
    }
    catch (err: any) {
        return Response.json({ success: false, error: err.message })
    }

}