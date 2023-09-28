import { readFileSync } from "node:fs";

class Matrix<T> implements Iterable<readonly [number, number[], number[]]> {
    constructor(private matrix: T[][]) { }
    [Symbol.iterator](): Iterator<readonly [number, number[], number[]]> {
        throw new Error("Method not implemented.");
    }
}

class MatrixIterator<T> implements Iterator<readonly [number, number[], number[]]> {
    next(...args: [] | [undefined]): IteratorResult<readonly [number, number[], number[]], any> {
        throw new Error("Method not implemented.");
    }
    return?(value?: any): IteratorResult<readonly [number, number[], number[]], any> {
        throw new Error("Method not implemented.");
    }
    throw?(e?: any): IteratorResult<readonly [number, number[], number[]], any> {
        throw new Error("Method not implemented.");
    }

}

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const treeMatrix =
    new Matrix(fileContent
        .split(/\r\n/)
        .map(line => line.split("").map(char => +char)));

