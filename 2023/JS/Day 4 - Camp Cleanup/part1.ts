import { readFileSync } from "node:fs";

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });

const isContained = ([[L1, L2], [R1, R2]]: readonly [readonly [number, number], readonly [number, number]]) =>
    (L1 >= R1 && L2 <= R2) || (R1 >= L1 && R2 <= L2)

const containedPairCount = fileContent
    .split(/\r\n/) // Split by new line
    .map(line => line.split(",")
        .map(range => range.split("-"))
        .map(item => [+item[0], +item[1]] as const))
    .map(item => [item[0], item[1]] as const) // Convert the line into an array of tuples of tuple of range [[[2,4], [5,8]], ...]
    .filter(isContained)
    .length

console.log(containedPairCount);