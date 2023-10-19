import * as crypto from 'node:crypto'
export function sha1ToBase64(text: string): string {
    const HASH = crypto.createHash('sha1').update(text ).digest('hex')
    const BUFFER = Buffer.from(HASH, 'hex')
    return BUFFER.toString('base64')
}

export function hexToBase64(hashHex: string){
    hashHex.padStart(hashHex.length +
        (hashHex.length %2), '0');
    const bytes = hashHex.match(/.{2}/g)?.map(
        byte => parseInt(byte, 16)
    );
   return bytes ? Buffer.from(String.fromCharCode( ...bytes), 'base64')
   .toString('base64') : '';
}

export function bigintToBase64(param: bigint){
    const hexString = param.toString(16);
    const hexPairs = hexString.match(/\w{2}/g);
    const bytes = hexPairs?.map( (pair) => parseInt(pair, 16));
    const byteString = bytes ? String.fromCharCode(...bytes) : ''
    const base64 = btoa(byteString);
    const formatedBase64 = base64.match(/.{1,76}/g)?.join('\n');
    return formatedBase64;
}

export function getRandomValues(min: number = 990, max: number = 9999){
    return Math.floor(Math.random() * (max - min + 1) + min);
}