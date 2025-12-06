import { db } from "@/db";
// import { pages } from "@/db/schema";
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
            extension = "." + type.split("/")[1]; // ex: "image/png" -> ".png"
        }

        const iDfile = crypto.randomUUID()
        await writeFile("./uploads/" + iDfile + extension, buffer);
        await db.insert(files).values(
            {
                filename: file.name,
                filepath: iDfile,
            }
        )
        const pagelink = generateRandomString(5)
        await db.insert(pages).values(
            {
                link: pagelink,
                filepath: (iDfile + extension)
            },
        )
        return Response.json({ sucess: true, link:pagelink})
    }
    catch (err : any)
    {
        return Response.json({success:false, error: err.message})
    }

}