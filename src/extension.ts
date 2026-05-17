import * as vscode from 'vscode'
import { hoverProvider } from './providers/hoverProvider'

export function activate(context: vscode.ExtensionContext) {
    const hover = vscode.languages.registerHoverProvider('*', hoverProvider)
    context.subscriptions.push(hover)
}

export function deactivate() {}