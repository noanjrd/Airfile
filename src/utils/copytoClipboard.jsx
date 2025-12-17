export async function copytoClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
    }
    catch (err) {
        console.log(err.message)
    }
}