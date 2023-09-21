import { readFileSync } from "node:fs";
const split = (str, index) => [str.slice(0, index), str.slice(index)];
const encoder = new TextEncoder();
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const logAndReturn = (item) => {
    console.log(item);
    return item;
};
const prioritySum = fileContent
    .split(/\r\n/) // Split by new line
    .map(line => split(line, line.length / 2)) // Split the line in the middle
    .map(group => group.map(item => encoder.encode(item))) // Convert the strings into UInt8Arrays
    .map(([first, second]) => first.filter(item => second.includes(item))) // Find Common items between 2 sides
    .map(commons => commons.filter((value, index, array) => array.indexOf(value) === index)) // Get only distinct items
    .map(commons => commons.map(item => item > 96 ? item - 96 : item - 38)) // Map items into priority score
    .reduce((acc, curr) => acc + curr.reduce((acc, curr) => acc + curr, 0), 0); // Sum up the priority score
console.log(prioritySum);
