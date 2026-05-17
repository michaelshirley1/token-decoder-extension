import decodeBase64 from "../../decoder/base64decode"
import { PATTERNS, types } from "./model"

export function detectTokenType(token: string): types {
    token = token.trim()

    if (PATTERNS.paseto.test(token)) {
        return types.paseto
    }

    if (PATTERNS.jwt.test(token)) {
        return types.jwt
    }

    if (PATTERNS.saml.test(token)) {
        try {
            const decoded = decodeBase64(token)
            if (decoded.includes('<saml:') || decoded.includes('<samlp:')) {
                return types.saml
            }
        } catch {
            return types.invalid
        }
        return types.base64
    }

    return types.unsupported
}