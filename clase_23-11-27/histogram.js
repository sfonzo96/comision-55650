// ESTE PROGRAMA GENERA UN HISTOGRAMA DE FRECUENCIAS
let numbers = {};
const MAX_NUMBER = 20;
const SAMPLE_SIZE = 500; // TAMAÑO DE MUESTRA

function generateRandomNumber(maxValue) {
    return Math.round(Math.random() * maxValue);
}

for (let i = 0; i < SAMPLE_SIZE; i++) {
    const number = generateRandomNumber(MAX_NUMBER);

    if (numbers.hasOwnProperty(number)) {
        numbers[number] += 1;
    } else {
        numbers[number] = 1;
    }
}

// LA MODA EN ESTADÍSTICA ES EL VALOR QUE MÁS SE REPITE DENTRO DE UNA MUESTRA, LA FRECUENCIA ES LA CANTIDAD DE VECES QUE OCURRE O SE REPITE DICHO VALOR
let mode = {
    value: 0,
    frequency: 0,
};

console.log(numbers);

// MOSTRAR UN HISTOGRAMA EN LA TERMINAL
for (number in numbers) {
    const frequency = numbers[number];
    let line = "";
    for (i = 0; i < frequency; i++) {
        line += "*";
    }

    // DETERMINAR CUAL ES LA MODA Y SU FRECUENCIA
    if (line.length > mode.frequency) {
        mode.value = number;
        mode.frequency = numbers[number];
    }

    console.log(line);
}

// SE MUESTRA LA MODA Y SU FRECUENCIA
console.log(`La moda es: ${mode.value}. Se repite ${mode.frequency} veces`);
