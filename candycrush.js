function generateMatrix() {
  let matrix = [];
  for (let i = 0; i < 11; i++) {
    let row = [];
    for (let j = 0; j < 11; j++) {
      row.push(Math.floor(Math.random() * 4) + 1);
    }
    matrix.push(row);
  }
  return matrix;
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].join(" ");
  }
}

function checkForCombinations(matrix) {
  let points = 0;
  let combinations = [];

  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
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
      } else if (
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
      } else if (
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

  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      let candy = matrix[i][j];

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

  combinations.sort((a, b) => b.points - a.points);
  return { combinations, points };
}

function removeCombinations(matrix, combinations) {
  combinations.forEach((combination) => {
    combination.cells.forEach(([i, j]) => {
      matrix[i][j] = 0;
    });
  });
}

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

function swapCandies(matrix, x1, y1, x2, y2) {
  let temp = matrix[x1][y1];
  matrix[x1][y1] = matrix[x2][y2];
  matrix[x2][y2] = temp;

  let { points, combinations } = checkForCombinations(matrix);
  if (combinations.length > 0) {
    return { valid: true, points, combinations };
  } else {
    temp = matrix[x1][y1];
    matrix[x1][y1] = matrix[x2][y2];
    matrix[x2][y2] = temp;

    return { valid: false };
  }
}

function playGame(matrix, maxMoves) {
  let totalPoints = 0;
  let moves = 0;

  console.log("Matricea inițială:");
  console.table(matrix);

  while (moves < maxMoves) {
    let { combinations } = checkForCombinations(matrix);

    if (combinations.length > 0) {
      totalPoints += combinations.reduce(
        (acc, combination) => acc + combination.points,
        0
      );
      removeCombinations(matrix, combinations);
      dropCandies(matrix);
    } else {
      let swapped = false;
      for (let i = 0; i < 11 && !swapped; i++) {
        for (let j = 0; j < 11 && !swapped; j++) {
          if (j < 10) {
            let swapResult = swapCandies(matrix, i, j, i, j + 1);
            if (swapResult.valid) {
              totalPoints += swapResult.points;
              swapped = true;
            }
          }

          if (i < 10 && !swapped) {
            let swapResult = swapCandies(matrix, i, j, i + 1, j);
            if (swapResult.valid) {
              totalPoints += swapResult.points;
              swapped = true;
            }
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

let matrix = generateMatrix();
playGame(matrix, 10000);
