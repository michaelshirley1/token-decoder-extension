export enum types {
    base64,
    jwt,
    saml,
    paseto,
    api,
    invalid
}

export const PATTERNS = {
    paseto: /^v[1-4]\.(local|public)\.[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)?$/,
    jwt:    /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/,
    saml:   /^[A-Za-z0-9+/=]+$/,  // base64 — decode and inspect content
}

export const TOKEN_REGEX = /(?:v[1-4]\.(?:local|public)\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)?|eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*|(?:sk_live_|sk_test_|xoxb-|xoxp-|ghp_|gho_|ghs_)[A-Za-z0-9_-]+|[A-Za-z0-9+/]{40,}={0,2})/