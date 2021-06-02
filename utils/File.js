import * as FileSystem from 'expo-file-system';

export default class File {
    constructor(fileName) {
        this.fileName = fileName;
        this.content = '';
    }

    putLine(line) {
        this.content += `${line}\n`;
    }

    clear() {
        this.content = '';
    }

    flush() {
        return new Promise((resolve, reject) => {
            const fileUri = `${FileSystem.documentDirectory}${this.fileName}`;

            FileSystem.writeAsStringAsync(fileUri, this.content)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
}