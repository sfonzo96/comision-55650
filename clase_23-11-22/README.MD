Realizar una clase de nombre StudentsManager, mediante la cual se pueda agregar, consultar, modificar y eliminar (CRUD) un estudiante manejándolo con persistencia de archivos (uso de fs de node)

Se debe incluir:

-   La clase debe contar con una variable "this.filePath", que mediante el constructor almacenará la ruta con la que se trabajarán los archivos

-   Debe guardar los usuarios con el siguiente formato:

    -   id (autoincrementable)
    -   nombre
    -   edad
    -   cursos (un array que almacene strings con los nombres de cursos)

-   Método addStudent

-   Método getStudents

-   Método getStudentById

-   Método updateStudent

-   Método deleteStudent

-   Método addCourseToStudent (opcional extra)

-   Método removeCourseFromStudent (opcional extra)
