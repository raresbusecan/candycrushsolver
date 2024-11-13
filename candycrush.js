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
    matrix[i].join(" ");
  }
}

// Funcție pentru detectarea formațiunilor și acordarea punctajului corespunzător
function checkForCombinations(matrix) {
  let points = 0;
  let combinations = [];

  // Verificare linii orizontale și verticale de 4 și 5 bomboane
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      // Asigurăm că nu depășim dimensiunea pe orizontală
      // Linie de 5 orizontală
      if (
        j + 4 < 11 &&
        matrix[i][j] === matrix[i][j + 1] &&
        matrix[i][j] === matrix[i][j + 2] &&
        matrix[i][j] === matrix[i][j + 3] &&
        matrix[i][j] === matrix[i][j + 4]
      ) {
        points += 50;
        combinations.push({
          type: "h5",
          points: 50,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i, j + 3],
            [i, j + 4],
          ],
        });
      }
      // Linie de 4 orizontală
      else if (
        j + 3 < 11 &&
        matrix[i][j] === matrix[i][j + 1] &&
        matrix[i][j] === matrix[i][j + 2] &&
        matrix[i][j] === matrix[i][j + 3]
      ) {
        points += 10;
        combinations.push({
          type: "h4",
          points: 10,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i, j + 3],
          ],
        });
      }
    }
  }

  for (let j = 0; j < 11; j++) {
    for (let i = 0; i < 8; i++) {
      // Asigurăm că nu depășim dimensiunea pe verticală
      // Linie de 5 verticală
      if (
        i + 4 < 11 &&
        matrix[i][j] === matrix[i + 1][j] &&
        matrix[i][j] === matrix[i + 2][j] &&
        matrix[i][j] === matrix[i + 3][j] &&
        matrix[i][j] === matrix[i + 4][j]
      ) {
        points += 50;
        combinations.push({
          type: "v5",
          points: 50,
          cells: [
            [i, j],
            [i + 1, j],
            [i + 2, j],
            [i + 3, j],
            [i + 4, j],
          ],
        });
      }
      // Linie de 4 verticală
      else if (
        i + 3 < 11 &&
        matrix[i][j] === matrix[i + 1][j] &&
        matrix[i][j] === matrix[i + 2][j] &&
        matrix[i][j] === matrix[i + 3][j]
      ) {
        points += 10;
        combinations.push({
          type: "v4",
          points: 10,
          cells: [
            [i, j],
            [i + 1, j],
            [i + 2, j],
            [i + 3, j],
          ],
        });
      }
    }
  }

  // Verificare formațiuni de tip L și T
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      let candy = matrix[i][j];

      // Formație T originală
      if (
        candy !== 0 &&
        j + 2 < 11 &&
        i + 2 < 11 &&
        candy === matrix[i][j + 1] &&
        candy === matrix[i][j + 2] &&
        candy === matrix[i + 1][j + 1] &&
        candy === matrix[i + 2][j + 1]
      ) {
        points += 30;
        combinations.push({
          type: "T",
          points: 30,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i + 1, j + 1],
            [i + 2, j + 1],
          ],
        });
      }

      // T inversat
      if (
        candy !== 0 &&
        j + 2 < 11 &&
        i - 2 >= 0 &&
        candy === matrix[i][j + 1] &&
        candy === matrix[i][j + 2] &&
        candy === matrix[i - 1][j + 1] &&
        candy === matrix[i - 2][j + 1]
      ) {
        points += 30;
        combinations.push({
          type: "T_inverted",
          points: 30,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i - 1, j + 1],
            [i - 2, j + 1],
          ],
        });
      }

      // T rotit la stânga
      if (
        candy !== 0 &&
        i + 2 < 11 &&
        j - 1 >= 0 &&
        j + 1 < 11 &&
        candy === matrix[i + 1][j] &&
        candy === matrix[i + 2][j] &&
        candy === matrix[i + 1][j - 1] &&
        candy === matrix[i + 1][j + 1]
      ) {
        points += 30;
        matrix[i][j] =
          matrix[i + 1][j] =
          matrix[i + 2][j] =
          matrix[i + 1][j - 1] =
          matrix[i + 1][j + 1] =
            0;
      }

      // T rotit la dreapta
      if (
        candy !== 0 &&
        i + 2 < 11 &&
        j - 1 >= 0 &&
        j + 1 < 11 &&
        candy === matrix[i + 1][j] &&
        candy === matrix[i + 2][j] &&
        candy === matrix[i + 1][j - 1] &&
        candy === matrix[i + 1][j + 1]
      ) {
        points += 30;
        matrix[i][j] =
          matrix[i + 1][j] =
          matrix[i + 2][j] =
          matrix[i + 1][j - 1] =
          matrix[i + 1][j + 1] =
            0;
      }

      // Formație L originală
      if (
        candy !== 0 &&
        i + 2 < 11 &&
        j + 2 < 11 &&
        candy === matrix[i + 1][j] &&
        candy === matrix[i + 2][j] &&
        candy === matrix[i + 2][j + 1] &&
        candy === matrix[i + 2][j + 2]
      ) {
        points += 20;
        combinations.push({
          type: "L_original",
          points: 20,
          cells: [
            [i, j],
            [i + 1, j],
            [i + 2, j],
            [i + 2, j + 1],
            [i + 2, j + 2],
          ],
        });
      }

      // L inversat
      if (
        candy !== 0 &&
        i + 2 < 11 &&
        j - 2 >= 0 &&
        candy === matrix[i + 1][j] &&
        candy === matrix[i + 2][j] &&
        candy === matrix[i + 2][j - 1] &&
        candy === matrix[i + 2][j - 2]
      ) {
        points += 20;
        combinations.push({
          type: "L_inverted",
          points: 20,
          cells: [
            [i, j],
            [i + 1, j],
            [i + 2, j],
            [i + 2, j - 1],
            [i + 2, j - 2],
          ],
        });
      }

      // L rotit la stânga
      if (
        candy !== 0 &&
        i + 2 < 11 &&
        j - 2 >= 0 &&
        candy === matrix[i][j + 1] &&
        candy === matrix[i][j + 2] &&
        candy === matrix[i + 1][j + 1] &&
        candy === matrix[i + 2][j + 1]
      ) {
        points += 20;
        combinations.push({
          type: "L_left_rotated",
          points: 20,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i + 1, j + 1],
            [i + 2, j + 1],
          ],
        });
      }

      // L rotit la dreapta
      if (
        candy !== 0 &&
        j + 2 < 11 &&
        i + 1 < 11 &&
        candy === matrix[i][j + 1] &&
        candy === matrix[i][j + 2] &&
        candy === matrix[i + 1][j + 2]
      ) {
        points += 20;
        combinations.push({
          type: "L_right_rotated",
          points: 20,
          cells: [
            [i, j],
            [i, j + 1],
            [i, j + 2],
            [i + 1, j + 2],
          ],
        });
      }
    }
  }

  // Sortam combinatiile in functie de punctaj
  combinations.sort((a, b) => b.points - a.points);
  return { combinations, points };
}

// Funcție pentru a elimina combinațiile selectate
function removeCombinations(matrix, combinations) {
  combinations.forEach((combination) => {
    combination.cells.forEach(([i, j]) => {
      matrix[i][j] = 0;
    });
  });
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

  let { points, combinations } = checkForCombinations(matrix);
  if (combinations.length > 0) {
    // Dacă schimbul este valid, returnăm true și punctele câștigate
    return { valid: true, points, combinations };
  } else {
    // Dacă schimbul nu este valid, revenim la starea inițială
    temp = matrix[x1][y1];
    matrix[x1][y1] = matrix[x2][y2];
    matrix[x2][y2] = temp;

    // Returnăm false, schimbul nu a creat o combinație validă
    return { valid: false };
  }
}

// Funcție principală pentru rularea jocului
// Funcția principală pentru gestionarea jocului
function playGame(matrix, maxMoves) {
  let totalPoints = 0;
  let moves = 0;

  console.log("Matricea inițială:");
  console.table(matrix);

  while (moves < maxMoves) {
    let { combinations } = checkForCombinations(matrix);

    // Dacă există combinații valide, le eliminăm
    if (combinations.length > 0) {
      totalPoints += combinations.reduce(
        (acc, combination) => acc + combination.points,
        0
      );
      removeCombinations(matrix, combinations);
      dropCandies(matrix);
    } else {
      // Căutăm cele mai bune schimburi pentru a aduna puncte mari
      let swapped = false;
      for (let i = 0; i < 11 && !swapped; i++) {
        for (let j = 0; j < 11 && !swapped; j++) {
          if (j < 10) {
            let swapResult = swapCandies(matrix, i, j, i, j + 1);
            if (swapResult.valid) {
              totalPoints += swapResult.points;
              swapped = true;
            };
          }

          if (i < 10 && !swapped) {
            let swapResult = swapCandies(matrix, i, j, i + 1, j);
            if (swapResult.valid) {
              totalPoints += swapResult.points;
              swapped = true;
            };
          }
        }
      }
    }

    moves++;
    console.log(`Mutare ${moves}: Puncte acumulate: ${totalPoints}`);
    if (totalPoints >= 10000) {
      console.log("Felicitări! Ai atins 10.000 de puncte.");
      break;
    }
  }

  console.log(`Puncte finale: ${totalPoints}`);
  return totalPoints;
}

// Inițializăm matricea și rulăm jocul cu un număr maxim de mutări (ex. 10000)
let matrix = generateMatrix();
playGame(matrix, 10000);
