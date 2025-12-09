import { db } from "@/db";
import { files, pages } from "@/db/schema";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";


function generateRandomString(length: number) {
    const choices: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * choices.length)
        result += choices[randomIndex]
    }
    return result
}

export async function POST(req: Response) {
    try {
        const data = await req.formData();
        const typedata = data.get("type") as string
        if (typedata === "text") {
            const textinput = data.get("textinput") as string
            const [inserteddata] = await db.insert(files).values({
                text : textinput
            }).returning({ id: files.id })
            const pagelink = generateRandomString(5)
            await db.insert(pages).values({
                fileid : inserteddata.id,
                link : pagelink,
                type : "text"
            })
            return Response.json({ sucess: true, link: pagelink})
        }
        if (typedata === "file") {
            const file = data.get("file") as File;
            if (!file)
                console.log("Error in file")
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer);
            if (!existsSync("./uploads")) {
                await mkdir("./uploads");
            }
            const type = file.type
            let extension = ""
            if (type.includes("/")) {
                extension = "." + type.split("/")[1];
            }

            const iDfile = crypto.randomUUID()
            await writeFile("./uploads/" + iDfile + extension, buffer);
            const [insertedFile] = await db.insert(files).values(
                {
                    filename: file.name,
                    filepath: (iDfile + extension),
                }
            ).returning({ id: files.id })
            const pagelink = generateRandomString(5)
            await db.insert(pages).values(
                {
                    link: pagelink,
                    fileid: insertedFile.id,
                    type : "file"
                },
            )
            return Response.json({ sucess: true, link: pagelink })
        }
        return Response.json({ sucess: false})
    }
    catch (err: any) {
        return Response.json({ success: false, error: err.message })
    }

}