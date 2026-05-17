import * as vscode from 'vscode'
import decodeBase64 from '../../decoder/base64decode'

export default function displayPASETO(token: string, md: vscode.MarkdownString) {
    md.appendMarkdown(`${token}\n\n`)
}