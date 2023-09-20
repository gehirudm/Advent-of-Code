import { readFileSync } from "node:fs";

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });

const caloriesSortedArray = fileContent
    .split(/\r?\n\r\n/)
    .map(block =>
        block.split(/\r\n/)
    )
    .map(block =>
        block
            .map(item => +item)
            .reduce((acc, curr) => acc + curr, 0)
    )
    .sort((a, b) => b - a)

const highest = caloriesSortedArray.find(() => true)
const sumOfHighest3 = caloriesSortedArray.slice(0, 3).reduce((acc, curr) => acc + curr, 0)

console.log(highest, sumOfHighest3);