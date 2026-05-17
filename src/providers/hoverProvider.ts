import * as vscode from 'vscode'
import { TOKEN_REGEX, types } from '../token/detector/model'
import { detectTokenType } from '../token/detector/detector'
import displayBase64 from '../token/types.ts/base64'

export const hoverProvider: vscode.HoverProvider = {
    provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position, TOKEN_REGEX)
        if (!range) return

        const token = document.getText(range)
        const md = new vscode.MarkdownString()
        md.supportHtml = true

        const type = detectTokenType(token)

        switch (type) {
            case types.base64:
                displayBase64(token, md)
                break;
            case types.jwt:
                displayBase64(token, md)
                break;
            case types.paseto:
                displayBase64(token, md)
                break;
            case types.saml:
                displayBase64(token, md)
                break;
            default:
                return null
        }

        return new vscode.Hover(md, range)
    }
}