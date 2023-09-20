import { readFileSync } from "node:fs";
var Action;
(function (Action) {
    Action[Action["Rock"] = 1] = "Rock";
    Action[Action["Paper"] = 2] = "Paper";
    Action[Action["Scissor"] = 3] = "Scissor";
})(Action || (Action = {}));
const opponentActionMap = {
    "A": Action.Rock,
    "B": Action.Paper,
    "C": Action.Scissor
};
const myActionMap = {
    "X": Action.Rock,
    "Y": Action.Paper,
    "Z": Action.Scissor
};
const possibilitySpace = {
    [Action.Rock]: {
        [Action.Rock]: 3,
        [Action.Paper]: 0,
        [Action.Scissor]: 6
    },
    [Action.Paper]: {
        [Action.Rock]: 6,
        [Action.Paper]: 3,
        [Action.Scissor]: 0
    },
    [Action.Scissor]: {
        [Action.Rock]: 0,
        [Action.Paper]: 6,
        [Action.Scissor]: 3
    }
};
const calculatePoints = ([opponent, me]) => me + possibilitySpace[me][opponent];
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const totalPoints = fileContent
    .split(/\r\n/)
    .map(row => row.split(" "))
    .map(([opponent, me]) => [opponentActionMap[opponent], myActionMap[me]])
    .map(calculatePoints)
    .reduce((acc, curr) => acc + curr, 0);
console.log(totalPoints);
