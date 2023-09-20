import { readFileSync } from "node:fs";
var Action;
(function (Action) {
    Action[Action["Rock"] = 1] = "Rock";
    Action[Action["Paper"] = 2] = "Paper";
    Action[Action["Scissor"] = 3] = "Scissor";
})(Action || (Action = {}));
var Outcome;
(function (Outcome) {
    Outcome[Outcome["Win"] = 1] = "Win";
    Outcome[Outcome["Lose"] = 2] = "Lose";
    Outcome[Outcome["Draw"] = 3] = "Draw";
})(Outcome || (Outcome = {}));
const opponentActionMap = {
    "A": Action.Rock,
    "B": Action.Paper,
    "C": Action.Scissor
};
const outcomeMap = {
    "X": Outcome.Lose,
    "Y": Outcome.Draw,
    "Z": Outcome.Win
};
const possibilitySpace = {
    [Action.Rock]: {
        [Outcome.Lose]: 0 + Action.Scissor,
        [Outcome.Draw]: 3 + Action.Rock,
        [Outcome.Win]: 6 + Action.Paper
    },
    [Action.Paper]: {
        [Outcome.Lose]: 0 + Action.Rock,
        [Outcome.Draw]: 3 + Action.Paper,
        [Outcome.Win]: 6 + Action.Scissor
    },
    [Action.Scissor]: {
        [Outcome.Lose]: 0 + Action.Paper,
        [Outcome.Draw]: 3 + Action.Scissor,
        [Outcome.Win]: 6 + Action.Rock
    }
};
const calculatePoints = ([opponent, outcome]) => possibilitySpace[opponent][outcome];
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const totalPoints = fileContent
    .split(/\r\n/)
    .map(row => row.split(" "))
    .map(([opponent, outcome]) => [opponentActionMap[opponent], outcomeMap[outcome]])
    .map(calculatePoints)
    .reduce((acc, curr) => acc + curr, 0);
console.log(totalPoints);
