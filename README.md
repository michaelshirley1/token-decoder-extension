![Installs](https://vsmarketplacebadges.dev/installs/MichaelShirley.token-decoder.svg)
![Rating](https://vsmarketplacebadges.dev/rating/MichaelShirley.token-decoder.svg)
![Version](https://vsmarketplacebadges.dev/version/MichaelShirley.token-decoder.svg)

# Token Decoder

Stop pasting your tokens into shady websites. Token Decoder is a VS Code extension that decodes and inspects tokens directly in your editor. Just hover over one!

<img width="800" height="450" alt="ezgif-501474117231efce" src="https://github.com/user-attachments/assets/ee5a0d7d-5cc8-433a-86aa-b6f0cbd68f4e" />

## Grab it here!
https://marketplace.visualstudio.com/items?itemName=MichaelShirley.token-decoder

## Features

Hover over any recognized token in any file to see a decoded breakdown inline.

**Supported token types:**

- **JWT** — decodes header and payload, shows algorithm, type, and expiry status
- **PASETO** — shows version, purpose (local/public), and attempts payload decode
- **SAML** — decodes base64 and formats the XML
- **Base64** — decodes and pretty-prints JSON if applicable, otherwise plain text

## Usage

1. Open any file in VS Code
2. Hover your cursor over a token — no selection needed
3. A hover popup appears with the decoded content

## Requirements

No dependencies. Works out of the box with VS Code 1.120.0 or later.

## Known Issues

- PASETO `local` (symmetric) tokens cannot be decrypted — the payload is shown truncated since a key is required
- SAML detection requires the base64 string to decode to XML containing `<saml:` or `<samlp:` tags

## Release Notes

### 0.0.1

Initial release — hover-based decoding for JWT, PASETO, SAML, Base64, and common API key formats.
