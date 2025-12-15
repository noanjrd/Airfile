"use client"

export async function downloadFiles(files: File[])
{
    files.forEach((file, index) => {
        setTimeout(() => {
            const url = URL.createObjectURL(file) // creer un lien te;poraire vers le fichier
            const a = document.createElement("a") // creer un element invisible <a>
            a.href = url
            a.download = file.name
            a.click()
            URL.revokeObjectURL(url)
        }, index * 2000);

    });
}