import { readFileSync } from "node:fs";
const encoder = new TextEncoder();
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const prioritySum = fileContent
    .split(/\r\n/) // Split by new line
    .reduce(([accHead, ...accTail], curr) => // Destructure the accumulator head and tail
 accHead.length < 3 ? // Check if the head of the accumulator is filled
    [[...accHead, curr], ...accTail] : // Not filled, so add to head
    [[curr], accHead, ...accTail] // Filled, add new item to accumulator
, [[]]) // Group into sets of 3 lines
    .map(group => group.map(item => encoder.encode(item))) // Convert the strings into UInt8Arrays
    .map(([first, second, third]) => first.filter(item => second.includes(item) && third.includes(item))) // Find Common items between 2 sides
    .map(commons => commons.filter((value, index, array) => array.indexOf(value) === index)) // Get only distinct items
    .map(commons => commons.map(item => item > 96 ? item - 96 : item - 38)) // Map items into priority score
    .reduce((acc, curr) => acc + curr.reduce((acc, curr) => acc + curr, 0), 0); // Sum up the priority score
console.log(prioritySum);
