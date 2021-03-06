let A = [], B = [], C = [];
let p, m, q, n= 1;
let time = 0;
let compare = 1,
    multi = 1,
    addition = 1,
    difference = 1,
    div = 1,
    abs = 1;
let T1;
let Ky = 0;
const LOW_LIMIT = -1;
const HIGH_LIMIT = 1;

function viewMatrix(tableData) {
    let table = document.createElement('table');
    table.setAttribute('id', 't');
    let tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        let row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);

}

function generateMatrix(row, col) {
    let array = [];
    for (let i = 0; i < row; i++) {
        array[i] = [];
        for (let j = 0; j < col; j++)
            array[i][j] = randomFloat();
    }
    return array;
}

let randomFloat = function () {
    return parseFloat(LOW_LIMIT * Math.random().toFixed(4) * (isNegative() ? LOW_LIMIT : HIGH_LIMIT));
};

let isNegative = function () {
    return Math.floor(Math.random() * 2) === 1;
};

function result() {
    for (let i = 0; i < p; i++) {
        C[i] = [];
        for (let j = 0; j < q; j++) {
            C[i][j] = computeElement(i, j, n);
        }
    }
}

function computeElement(i, j, n) {
    let sum = 0;
    for (let k = 0; k < m; k++){
        sum += f(i, j, k);
    }
    return parseFloat(sum.toFixed(4));
}

function f(i, j, k) {
    let a = Math.pow(A[i][k], 2);
    let b = Math.abs(A[i][k] * B[k][j]);
    return (a > b ? a - b : (B[k][j] === 0 ? a : a / Math.abs(B[k][j])));
}

function timeCounting(n, p, m, q) {
    let t = 0;
    let N = Math.ceil(m / n);
    t += fTime() * N;
    t += Math.ceil((m - 1) / n ) * parseInt(addition);
    return t * p * q;
}

let fTime = function(){
    return parseInt(multi) * 2 + parseInt(abs) * 2 +
        parseInt(compare) * 2 + parseInt(div) + parseInt(difference);
};

/**
 * @return {number}
 */
function D(n, p, m, q) {
    return Lsum(n, p, m, q) / Lavg(n, p, m, q);
}

/**
 * @return {number}
 */
let Lsum = function (n, p, m, q) {
    let d = 0;
    let Nf = Math.ceil(m / n);
    d += Nf * fTime();
    d += Math.ceil((m - 1) / n ) * parseInt(addition);
    return d * p * q;
};

/**
 * @return {number}
 */
let Lavg = function (n, p, m, q) {
    let d = 0;
    let Nf = Math.floor(m / n);
    d += n * Nf *fTime();
    d += fTime() * (m  - Nf * n);
    let Nt = Math.floor((m - 1) / n);
    d += Nt * parseInt(addition);
    d+= parseInt(addition) * (m  - Nt * n);
    return 1/m * (d * p * q);
};

