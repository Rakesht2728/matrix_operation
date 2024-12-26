// This function is triggered when the user clicks the "Submit" button
function processMatrixOperation() {
    const operation = document.getElementById("operation").value;
    const matrix1 = parseMatrix(document.getElementById("matrix1").value);
    let matrix2 = null;

    if (operation !== 'transpose' && operation !== 'determinant') {
        matrix2 = parseMatrix(document.getElementById("matrix2").value);
    }

    let result;
    switch (operation) {
        case 'add':
            result = addMatrices(matrix1, matrix2);
            break;
        case 'subtract':
            result = subtractMatrices(matrix1, matrix2);
            break;
        case 'multiply':
            result = multiplyMatrices(matrix1, matrix2);
            break;
        case 'transpose':
            result = transposeMatrix(matrix1);
            break;
        case 'determinant':
            result = calculateDeterminant(matrix1);
            break;
        default:
            result = "Invalid operation.";
    }

    displayResult(result);
}

// Helper function to parse matrix input (converts input string to array)
function parseMatrix(matrixStr) {
    return matrixStr.split('\n').map(row => row.split(' ').map(Number));
}

// Matrix Addition
function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        return "Matrix dimensions must be the same for addition.";
    }
    return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
}

// Matrix Subtraction
function subtractMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        return "Matrix dimensions must be the same for subtraction.";
    }
    return matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
}

// Matrix Multiplication
function multiplyMatrices(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
        return "Matrix multiplication is not possible due to dimension mismatch.";
    }
    return matrix1.map((row, i) =>
        matrix2[0].map((_, j) =>
            row.reduce((sum, val, k) => sum + val * matrix2[k][j], 0)
        )
    );
}

// Matrix Transpose
function transposeMatrix(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// Calculate Determinant (for square matrices only)
function calculateDeterminant(matrix) {
    if (matrix.length !== matrix[0].length) {
        return "Matrix must be square to calculate determinant.";
    }

    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // For larger matrices, use a recursive approach (Cofactor Expansion)
    let determinant = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        determinant += matrix[0][i] * cofactor(matrix, 0, i);
    }
    return determinant;
}

function cofactor(matrix, row, col) {
    return Math.pow(-1, row + col) * determinantOfMinor(matrix, row, col);
}

function determinantOfMinor(matrix, row, col) {
    const minor = matrix.filter((_, i) => i !== row)
                        .map(r => r.filter((_, j) => j !== col));
    return calculateDeterminant(minor);
}

// Function to display the result
function displayResult(result) {
    const resultContainer = document.getElementById('result');
    if (Array.isArray(result)) {
        resultContainer.textContent = result.map(row => row.join(' ')).join('\n');
    } else {
        resultContainer.textContent = result;
    }
}
