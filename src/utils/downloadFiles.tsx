"use client"

export async function downloadFiles(files: File[]) {
    files.forEach((file, index) => {
        setTimeout(() => {
            const url = URL.createObjectURL(file)
            const a = document.createElement("a")
            a.href = url
            a.download = file.name
            a.click()
            URL.revokeObjectURL(url)
        }, index * 2000);

    });
}