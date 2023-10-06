import { readFile } from 'fs/promises'

export class FileManager {
    private data: Buffer | undefined;
    async openFile(path: string) {
        try {
            this.data = await readFile(path);
            console.log(this.data);
            return this;
        } catch (err) {
            console.log(err);
        }
    }

    async toString(encoding: BufferEncoding) {
        if (!this.data) throw new Error()
        return this.data.toString(encoding)

    }

    getFile() {
        return this.data;
    }
}
