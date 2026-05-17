import * as vscode from 'vscode'
import decodeBase64 from '../../decoder/base64decode'

function formatXml(xml: string): string {
    let indent = 0
    const tab = '  '
    return xml
        .replace(/>\s*</g, '>\n<')
        .split('\n')
        .map(node => {
            const trimmed = node.trim()
            if (!trimmed) return ''
            if (trimmed.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
            const line = tab.repeat(indent) + trimmed
            if (trimmed.match(/^<\w[^>]*[^/]>$/) && !trimmed.startsWith('<?')) indent++
            return line
        })
        .filter(Boolean)
        .join('\n')
}

export default function displaySAML(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown('### SAML\n\n')
    try {
        const decoded = decodeBase64(token)
        const formatted = formatXml(decoded)
        md.appendMarkdown('**Decoded XML**\n\n')
        md.appendCodeblock(formatted, 'xml')
    } catch {
        md.appendMarkdown('Failed to decode SAML token')
    }
}