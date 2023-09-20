import { readFileSync } from "node:fs";

enum Action {
    Rock = 1,
    Paper = 2,
    Scissor = 3
}

enum Outcome {
    Win = 1,
    Lose = 2,
    Draw = 3
}

const opponentActionMap = {
    "A": Action.Rock,
    "B": Action.Paper,
    "C": Action.Scissor
}

const outcomeMap = {
    "X": Outcome.Lose,
    "Y": Outcome.Draw,
    "Z": Outcome.Win
}

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
}

const calculatePoints = ([opponent, outcome]: readonly [Action, Outcome]) => possibilitySpace[opponent][outcome]

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });

const totalPoints = fileContent
    .split(/\r\n/)
    .map(row =>
        row.split(" ")
    )
    .map(([opponent, outcome]) => [opponentActionMap[opponent] as Action, outcomeMap[outcome] as Outcome] as const)
    .map(calculatePoints)
    .reduce((acc, curr) => acc + curr, 0)

console.log(totalPoints);