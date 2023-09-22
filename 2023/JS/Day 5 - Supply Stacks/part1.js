import { readFileSync } from "node:fs";
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const [arrangementRaw, stepsRaw] = fileContent.split(/\r\n\r\n/);
const parseCrates = (input) => Array.from({ length: 9 }, (_x, i) => 1 + (i * 4)).map(i => input[i]);
const parseSteps = (input) => {
    const parts = input.match(/(\d+)/gm);
    return !parts ? [] : parts.map((p) => parseInt(p, 10));
};
// Cleaning up the arrangement string
const arrangement = arrangementRaw
    .split(/\r\n/)
    .slice(0, -1)
    .reverse()
    .map(parseCrates)
    .reduce((acc, curr) => acc.map((val, i) => ([...val, curr[i]])), Array(9).fill([]))
    .map(col => col.filter(x => x != " "));
const actionFactory = (from, to, amount) => (arrangement) => {
    arrangement[to] = [...arrangement[to], ...arrangement[from].slice(-amount).reverse()];
    arrangement[from] = [...arrangement[from].slice(0, -amount)];
};
stepsRaw
    .split(/\r\n/)
    .map(parseSteps)
    .map(([a, b, c]) => [a, b, c])
    .map(([amount, from, to]) => actionFactory(from - 1, to - 1, amount))
    .forEach(action => action(arrangement));
const topLetters = arrangement
    .map(col => col.pop())
    .filter((item) => !!item)
    .join("");
console.log(topLetters);
