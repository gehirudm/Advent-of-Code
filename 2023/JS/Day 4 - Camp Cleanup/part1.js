import { readFileSync } from "node:fs";
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const containedPairCount = fileContent
    .split(/\r\n/) // Split by new line
    .map(line => line.split(",")
    .map(range => range.split("-"))
    .map(item => [+item[0], +item[1]]))
    .map(item => [item[0], item[1]]) // Convert the line into an array of tuples of tuple of range [[[2,4], [5,8]], ...]
    .filter(([[leftLower, leftUpper], [rightLower, rightUpper]]) => (leftLower >= rightLower && leftUpper <= rightUpper) || (rightLower >= leftLower && rightUpper <= leftUpper))
    .length;
console.log(containedPairCount);
