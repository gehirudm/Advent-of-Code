import { readFileSync } from "node:fs";
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const doOverlap = ([[L1, L2], [R1, R2]]) => Math.max(L1, R1) <= Math.min(L2, R2);
const containedPairCount = fileContent
    .split(/\r\n/) // Split by new line
    .map(line => line.split(",")
    .map(range => range.split("-"))
    .map(item => [+item[0], +item[1]]))
    .map(item => [item[0], item[1]]) // Convert the line into an array of tuples of tuple of range [[[2,4], [5,8]], ...]
    .filter(doOverlap)
    .length;
console.log(containedPairCount);
