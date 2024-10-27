// Inițializare matrice 11x11 cu bomboane aleatorii
function generateMatrix() {
    let matrix = [];
    for (let i = 0; i < 11; i++) {
        let row = [];
        for (let j = 0; j < 11; j++) {
            // Generăm un număr între 1 și 4, reprezentând bomboanele de diverse culori
            row.push(Math.floor(Math.random() * 4) + 1);
        }
        matrix.push(row);
    }
    return matrix;
}

// Funcție pentru afișarea matricei
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

// Funcție pentru detectarea formațiunilor și acordarea punctajului corespunzător
function checkForCombinations(matrix) {
    let points = 0;

    // Verificare linii orizontale și verticale de 4 și 5 bomboane
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 8; j++) {  // Asigurăm că nu depășim dimensiunea pe orizontală
            // Linie de 5 orizontală
            if (j + 4 < 11 && matrix[i][j] === matrix[i][j + 1] && matrix[i][j] === matrix[i][j + 2] && matrix[i][j] === matrix[i][j + 3] && matrix[i][j] === matrix[i][j + 4]) {
                points += 50;
                for (let k = 0; k < 5; k++) matrix[i][j + k] = 0;
            }
            // Linie de 4 orizontală
            else if (j + 3 < 11 && matrix[i][j] === matrix[i][j + 1] && matrix[i][j] === matrix[i][j + 2] && matrix[i][j] === matrix[i][j + 3]) {
                points += 10;
                for (let k = 0; k < 4; k++) matrix[i][j + k] = 0;
            }
        }
    }

    for (let j = 0; j < 11; j++) {
        for (let i = 0; i < 8; i++) {  // Asigurăm că nu depășim dimensiunea pe verticală
            // Linie de 5 verticală
            if (i + 4 < 11 && matrix[i][j] === matrix[i + 1][j] && matrix[i][j] === matrix[i + 2][j] && matrix[i][j] === matrix[i + 3][j] && matrix[i][j] === matrix[i + 4][j]) {
                points += 50;
                for (let k = 0; k < 5; k++) matrix[i + k][j] = 0;
            }
            // Linie de 4 verticală
            else if (i + 3 < 11 && matrix[i][j] === matrix[i + 1][j] && matrix[i][j] === matrix[i + 2][j] && matrix[i][j] === matrix[i + 3][j]) {
                points += 10;
                for (let k = 0; k < 4; k++) matrix[i + k][j] = 0;
            }
        }
    }

    // Verificare formațiuni de tip L și T
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let candy = matrix[i][j];

            // Formație de tip T (orizontală de 3 și coloană centrală verticală)
            if (candy !== 0 && j + 2 < 11 && i + 2 < 11 &&
                candy === matrix[i][j + 1] && candy === matrix[i][j + 2] &&
                candy === matrix[i + 1][j + 1] && candy === matrix[i + 2][j + 1]) {
                points += 30;
                matrix[i][j] = matrix[i][j + 1] = matrix[i][j + 2] = matrix[i + 1][j + 1] = matrix[i + 2][j + 1] = 0;
            }

            // Formație de tip L (verticală de 3 și orizontală la bază)
            if (candy !== 0 && i + 2 < 11 && j + 2 < 11 &&
                candy === matrix[i + 1][j] && candy === matrix[i + 2][j] &&
                candy === matrix[i + 2][j + 1] && candy === matrix[i + 2][j + 2]) {
                points += 20;
                matrix[i][j] = matrix[i + 1][j] = matrix[i + 2][j] = matrix[i + 2][j + 1] = matrix[i + 2][j + 2] = 0;
            }
        }
    }

    return points;
}

// Funcție pentru rearanjarea bomboanelor după eliminarea formațiunilor
function dropCandies(matrix) {
    for (let j = 0; j < 11; j++) {
        for (let i = 10; i >= 0; i--) {
            if (matrix[i][j] === 0) {
                for (let k = i; k > 0; k--) {
                    matrix[k][j] = matrix[k - 1][j];
                }
                matrix[0][j] = Math.floor(Math.random() * 4) + 1;
            }
        }
    }
}

// Funcție pentru realizarea unei singure mutări (interschimbare de două bomboane)
function swapCandies(matrix, x1, y1, x2, y2) {
    let temp = matrix[x1][y1];
    matrix[x1][y1] = matrix[x2][y2];
    matrix[x2][y2] = temp;
}

// Funcție principală pentru rularea jocului
function playGame(matrix, maxMoves) {
    let totalPoints = 0;
    let moves = 0;

    while (moves < maxMoves && totalPoints < 10000) {
        let points = checkForCombinations(matrix);

        if (points > 0) {
            totalPoints += points;
            dropCandies(matrix);
        } else {
            // Căutăm o mutare validă care poate forma o combinație
            let swapped = false;
            for (let i = 0; i < 11 && !swapped; i++) {
                for (let j = 0; j < 11 && !swapped; j++) {
                    if (j < 10) {
                        // Încearcă interschimbarea orizontală
                        swapCandies(matrix, i, j, i, j + 1);
                        if (checkForCombinations(matrix) > 0) {
                            swapped = true;
                        } else {
                            swapCandies(matrix, i, j, i, j + 1); // Revenim la mutarea inițială
                        }
                    }
                    if (i < 10 && !swapped) {
                        // Încearcă interschimbarea verticală
                        swapCandies(matrix, i, j, i + 1, j);
                        if (checkForCombinations(matrix) > 0) {
                            swapped = true;
                        } else {
                            swapCandies(matrix, i, j, i + 1, j); // Revenim la mutarea inițială
                        }
                    }
                }
            }
            if (!swapped) break; // Nu mai există mutări posibile
        }
        moves++;
    }

    console.log(`Joc terminat cu ${totalPoints} puncte după ${moves} mutări.`);
    console.log(`Media punctajului per mutare: ${(totalPoints / moves).toFixed(2)}`);
}

// Inițializăm și rulăm jocul
let matrix = generateMatrix();
playGame(matrix, 10000);
