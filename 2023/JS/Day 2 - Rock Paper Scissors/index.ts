import { readFileSync } from "node:fs";

enum Action {
    Rock = 1,
    Paper = 2,
    Scissor = 3
}

const opponentActionMap = {
    "A": Action.Rock,
    "B": Action.Paper,
    "C": Action.Scissor
}

const myActionMap = {
    "X": Action.Rock,
    "Y": Action.Paper,
    "Z": Action.Scissor
}

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
}

const calculatePoints = ([opponent, me]: readonly [Action, Action]) =>
    me as number + possibilitySpace[me][opponent]

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });

const totalPoints = fileContent
    .split(/\r\n/)
    .map(row =>
        row.split(" ")
    )
    .map(([opponent, me]) => [opponentActionMap[opponent] as Action, myActionMap[me] as Action] as const)
    .map(calculatePoints)
    .reduce((acc, curr) => acc + curr, 0)

console.log(totalPoints);