import { readFileSync } from "node:fs";
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const highest = fileContent
    .split(/\r?\n\r\n/)
    .map(block => block.split(/\r\n/))
    .map(block => block
    .map(item => +item)
    .reduce((acc, curr) => acc + curr, 0))
    .sort((a, b) => b - a)
    .find(() => true);
console.log(highest);
