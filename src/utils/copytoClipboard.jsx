export async function copytoClipboard(text)
{
    try{
        await navigator.clipboard.writeText(text)
        // return true
    }
    catch (err ) {
        console.log(err.message)
        // return false
    }
}