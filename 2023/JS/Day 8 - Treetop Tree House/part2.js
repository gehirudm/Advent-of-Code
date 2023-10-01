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
    map(predicate) {
        let newMattrix = Array.from({ length: this.matrix.length }, (_x, _i) => Array.from({ length: this.getRow(0).length }, (_x, _i) => undefined));
        for (const [item, _row, _col] of this) {
            newMattrix[_row][_col] = predicate(this.getRow(_row), this.getCol(_col), _row, _col);
        }
        return new Matrix(newMattrix);
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
const mapToScenicScore = (row, col, rowIndex, colIndex) => {
    const _calculateViewDistance = (arr, item) => {
        let viewDistance = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element == item) {
                viewDistance++;
                break;
            }
            viewDistance++;
        }
        return viewDistance;
    };
    return _calculateViewDistance(row.slice(0, rowIndex).reverse(), row[rowIndex])
        * _calculateViewDistance(row.slice(rowIndex + 1), row[rowIndex])
        * _calculateViewDistance(col.slice(colIndex).reverse(), col[colIndex])
        * _calculateViewDistance(col.slice(colIndex + 1), col[colIndex]);
};
const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const treeMatrix = new Matrix(fileContent
    .split(/\r\n/)
    .map(line => line.split("").map(char => +char)));
const scoreMatrix = treeMatrix.map(mapToScenicScore);
console.log(scoreMatrix);
let highestScore = 0;
for (const [item, _row, _col] of scoreMatrix) {
    if (item > highestScore)
        highestScore = item;
}
console.log(highestScore);
