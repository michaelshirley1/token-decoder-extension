import * as vscode from 'vscode'
import decodeBase64 from '../../decoder/base64decode'

export function displayBase64(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown('### Base64\n\n')
    try {
        const decoded = decodeBase64(token)
        try {
            const parsed = JSON.parse(decoded)
            md.appendMarkdown('**Decoded** *(JSON)*\n\n')
            md.appendCodeblock(JSON.stringify(parsed, null, 2), 'json')
        } catch {
            md.appendMarkdown('**Decoded**\n\n')
            md.appendCodeblock(decoded, 'text')
        }
    } catch {
        md.appendMarkdown('Failed to decode base64')
    }
}

export function displayInvalidBase64(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown('### Invalid Base64\n\n')
    md.appendMarkdown('This token could not be decoded as valid base64.\n\n')
    md.appendMarkdown('**Raw value**\n\n')
    md.appendCodeblock(token, 'text')
}

export default displayBase64
