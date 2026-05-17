export default function decodeBase64(base64: string) {
    base64 = base64.normalize("NFKD")
    let base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let charMap = Object.fromEntries([...base64Chars].map((c, i) => [c, i]));

    base64 = base64.replace(/=+$/, '')
    let bits = ""

    for (let i = 0; i < base64.length; i++) {
        bits += charMap[base64[i]].toString(2).padStart(6, '0')
    }

    let result = ""
    for (let i = 0; i < bits.length - (bits.length % 8); i += 8) {
        result += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
    }
    
    return result;
}