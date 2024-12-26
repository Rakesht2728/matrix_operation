from django.shortcuts import render
import numpy as np

def index(request):
    result = None
    if request.method == "POST":
        operation = request.POST.get("operation")
        matrix1_input = request.POST.get("matrix1").splitlines()
        matrix1 = np.array([list(map(int, row.split())) for row in matrix1_input])

        if operation in ["add", "subtract", "multiply"]:
            matrix2_input = request.POST.get("matrix2").splitlines()
            matrix2 = np.array([list(map(int, row.split())) for row in matrix2_input])

        if operation == "add":
            result = np.add(matrix1, matrix2)
        elif operation == "subtract":
            result = np.subtract(matrix1, matrix2)
        elif operation == "multiply":
            if matrix1.shape[1] == matrix2.shape[0]:
                result = np.dot(matrix1, matrix2)
            else:
                result = "Error: Matrices cannot be multiplied due to incompatible dimensions."
        elif operation == "transpose":
            result = np.transpose(matrix1)
        elif operation == "determinant":
            if matrix1.shape[0] == matrix1.shape[1]:
                result = np.linalg.det(matrix1)
            else:
                result = "Determinant is not defined for non-square matrices"

    return render(request, 'index.html', {'result': result})
