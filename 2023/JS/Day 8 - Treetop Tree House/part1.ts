import { readFileSync } from "node:fs";

class Matrix<T> implements Iterable<readonly [T, number, number]> {
    constructor(private matrix: T[][]) { }
    [Symbol.iterator](): MatrixIterator<T> {
        return new MatrixIterator(this.matrix);
    }

    getRow(index: number) {
        return this.matrix[index];
    }

    getCol(index: number) {
        return this.matrix.map(row => row[index]);
    }
}

class MatrixIterator<T> implements Iterator<readonly [T, number, number]> {
    private row: number;
    private col: number;
    private done: boolean;

    constructor(private matrix: T[][]) {
        this.row = 0;
        this.col = 0;
        this.done = false;
    }

    next(): IteratorResult<readonly [T, number, number], readonly [T, number, number] | undefined> {
        if (this.done) {
            return {
                value: undefined,
                done: this.done
            }
        }

        const value = this.matrix[this.row][this.col];
        const currRow = this.row;
        const currCol = this.col;

        if (this.col + 1 > (this.matrix[0].length - 1)) {
            // Check if this is the last element
            if (this.row == this.matrix.length - 1 && this.col == this.matrix[0].length - 1) {
                this.done = true;
            } else {
                // Reset column to 0 and increment row
                this.col = 0;
                this.row += 1;
            }
        } else this.col += 1;

        return {
            value: [value, currRow, currCol],
            done: false
        }
    }
}

const isVisible = (arr: number[], index: number) => {
    const _isVisible = (arr: number[], item: number) => arr.map(x => x < item).reduce((acc, curr) => acc && curr, true)

    return _isVisible(arr.slice(0, index), arr[index]) || _isVisible(arr.slice(index + 1), arr[index])
}

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const treeMatrix =
    new Matrix(fileContent
        .split(/\r\n/)
        .map(line => line.split("").map(char => +char)));

let visibleCount = 0;

for (const [height, row, col] of treeMatrix) {
    // console.log(row, col);

    if (row == 0 || row == (treeMatrix.getCol(0).length - 1) || col == 0 || col == (treeMatrix.getRow(0).length - 1)) {
        // Tree is at the edge of the Matrix, Not hidden
        visibleCount++;
        continue;
    }

    if (isVisible(treeMatrix.getRow(row), col) || isVisible(treeMatrix.getCol(col), row)) {
        visibleCount++;
    }
}

console.log(visibleCount);