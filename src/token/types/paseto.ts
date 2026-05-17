import * as vscode from 'vscode'
import decodeBase64 from '../../decoder/base64decode'

function decodeBase64Url(part: string): string {
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    return decodeBase64(padded)
}

const VERSION_LABELS: Record<string, string> = {
    v1: 'v1 (RSA / AES-CTR)',
    v2: 'v2 (Ed25519 / XChaCha20)',
    v3: 'v3 (ECDSA P-384 / AES-CTR)',
    v4: 'v4 (Ed25519 / XChaCha20-Poly1305)',
}

export default function displayPASETO(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown('### PASETO\n\n')

    const parts = token.split('.')
    const version = parts[0]
    const purpose = parts[1]
    const payload = parts[2]
    const footer = parts[3]

    const versionLabel = VERSION_LABELS[version] ?? version
    const purposeLabel = purpose === 'local' ? 'local *(symmetric)*' : 'public *(asymmetric)*'

    md.appendMarkdown(`**Version:** \`${versionLabel}\` &nbsp; **Purpose:** ${purposeLabel}\n\n`)

    if (purpose === 'public') {
        try {
            const decoded = decodeBase64Url(payload)
            const parsed = JSON.parse(decoded)
            md.appendMarkdown('**Payload**\n\n')
            md.appendCodeblock(JSON.stringify(parsed, null, 2), 'json')
        } catch {
            md.appendMarkdown('**Payload** *(binary)*\n\n')
            md.appendMarkdown(`\`${payload.substring(0, 32)}…\``)
        }
    } else {
        md.appendMarkdown('**Payload** *(encrypted — local key required)*\n\n')
        md.appendMarkdown(`\`${payload.substring(0, 32)}…\``)
    }

    if (footer) {
        try {
            const decoded = decodeBase64Url(footer)
            md.appendMarkdown('\n\n**Footer**\n\n')
            md.appendCodeblock(decoded, 'json')
        } catch {}
    }
}
