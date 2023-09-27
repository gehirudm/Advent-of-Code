import { readFileSync } from "node:fs";

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const stream = fileContent.trimEnd();

for (let index = 0; index < stream.length; index++) {
    const is4LettersUnique =
        stream
            .slice(index, index + 4) // Section of 4 Letters
            .split("") // Split into characters
            .filter((val, idx, arr) => arr.lastIndexOf(val) != idx).length == 0 // Check if there's repeated characters

    if (is4LettersUnique) {
        console.log(index + 4, stream.slice(index, index + 4));
        break;
    }
}