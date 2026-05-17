import * as vscode from 'vscode'
import { TOKEN_REGEX, types } from '../token/detector/model'
import { detectTokenType } from '../token/detector/detector'
import { displayInvalidBase64, displayBase64 } from '../token/types.ts/base64'
import displayJWT from '../token/types.ts/jwt'
import displayPASETO from '../token/types.ts/paseto'
import displaySAML from '../token/types.ts/saml'

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
                displayJWT(token, md)
                break;
            case types.paseto:
                displayPASETO(token, md)
                break;
            case types.saml:
                displaySAML(token, md)
                break;
            case types.invalid:
                displayInvalidBase64(token, md)
            default:
                return null
        }

        return new vscode.Hover(md, range)
    }
}