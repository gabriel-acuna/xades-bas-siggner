import * as crypto from 'node:crypto'
export function sha1ToBase64(text: string): string {
    const HASH = crypto.createHash('sha1').update(text ).digest('hex')
    const BUFFER = Buffer.from(HASH, 'hex')
    return BUFFER.toString('base64')
}