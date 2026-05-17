import * as vscode from 'vscode'
import decodeBase64 from '../../decoder/base64decode'


function decodeJwtPart(part: string): string {
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    return decodeBase64(padded)
}

function expiryLabel(exp: number): string {
    const now = Math.floor(Date.now() / 1000)
    if (exp < now) return ' &nbsp;*Expired*'
    const secs = exp - now
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    if (hours > 0) return ` &nbsp;*Expires in ${hours}h ${mins % 60}m*`
    return ` &nbsp;*Expires in ${mins}m*`
}

export default function displayJWT(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown('### JWT\n\n')

    const parts = token.split('.')
    if (parts.length !== 3) {
        md.appendMarkdown('Invalid JWT structure')
        return
    }

    let header: Record<string, unknown>, payload: Record<string, unknown>
    try {
        header = JSON.parse(decodeJwtPart(parts[0]))
        payload = JSON.parse(decodeJwtPart(parts[1]))
    } catch {
        md.appendMarkdown('Failed to decode JWT parts')
        return
    }

    const alg = header.alg as string | undefined
    const typ = header.typ as string | undefined
    md.appendMarkdown(`**Algorithm:** \`${alg ?? 'unknown'}\``)
    if (typ) md.appendMarkdown(` &nbsp; **Type:** \`${typ}\``)
    md.appendMarkdown('\n\n')

    md.appendMarkdown('**Header**\n\n')
    md.appendCodeblock(JSON.stringify(header, null, 2), 'json')

    const exp = typeof payload.exp === 'number' ? payload.exp : undefined
    md.appendMarkdown(`**Payload**${exp !== undefined ? expiryLabel(exp) : ''}\n\n`)
    md.appendCodeblock(JSON.stringify(payload, null, 2), 'json')

    md.appendMarkdown(`**Signature** &nbsp;\`${parts[2].substring(0, 16)}…\``)
}