import { readFileSync } from "node:fs";
class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
    }
    [Symbol.iterator]() {
        return new MatrixIterator(this.matrix);
    }
    getRow(index) {
        return this.matrix[index];
    }
    getCol(index) {
        return this.matrix.map(row => row[index]);
    }
}
class MatrixIterator {
    constructor(matrix) {
        this.matrix = matrix;
        this.row = 0;
        this.col = 0;
        this.done = false;
    }
    next() {
        if (this.done) {
            return {
                value: undefined,
                done: this.done
            };
        }
        const value = this.matrix[this.row][this.col];
        const currRow = this.row;
        const currCol = this.col;
        if (this.col + 1 > (this.matrix[0].length - 1)) {
            // Check if this is the last element
            if (this.row == this.matrix.length - 1 && this.col == this.matrix[0].length - 1) {
                this.done = true;
            }
            else {
                // Reset column to 0 and increment row
                this.col = 0;
                this.row += 1;
            }
        }
        else
            this.col += 1;
        return {
            value: [value, currRow, currCol],
            done: false
        };
    }
}
const isVisible = (arr, index) => {
    const _isVisible = (arr, item) => arr.map(x => x < item).reduce((acc, curr) => acc && curr, true);
    return _isVisible(arr.slice(0, index), arr[index]) || _isVisible(arr.slice(index + 1), arr[index]);
};
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const treeMatrix = new Matrix(fileContent
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
