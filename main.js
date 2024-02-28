// DECLARACIÓN DE VARIABLES
const input = document.querySelectorAll("input");
const errorMessage = document.querySelectorAll(".error");
const button = document.querySelector(".submit-button");
const day = document.querySelector(".display-days");
const month = document.querySelector(".display-months");
const year = document.querySelector(".display-years");

// Función para mostrar u ocultar mensaje de error
const toggleError = (index, show) => {
    errorMessage[index].style.opacity = show ? 1 : 0;
}

// Función principal
const calculateAge = () => {
    // Verifica si los campos de entrada están vacíos
    let isEmpty = false;
    input.forEach((element, index) => {
        const isNumeric = !isNaN(element.value);
        toggleError(index, !element.value || !isNumeric);
        if (!element.value || !isNumeric) {
            isEmpty = true;
        }
    });

    // Si algún campo está vacío o no es numérico, no realiza el cálculo
    if (isEmpty) {
        return;
    }

    // Obtiene la fecha actual
    const todayDate = new Date();
    const todayDay = todayDate.getDate();
    const todayMonth = todayDate.getMonth() + 1;
    const todayYear = todayDate.getFullYear();

    // Obtiene los valores de los campos de entrada
    const inputDay = parseInt(input[0].value);
    const inputMonth = parseInt(input[1].value);
    const inputYear = parseInt(input[2].value);

    // Calcula la edad
    let y = todayYear - inputYear;
    let m = todayMonth - inputMonth;
    let d = todayDay - inputDay;

    if (d < 0) {
        m -= 1;
        d += numberOfMonth[inputMonth - 1];
    }
    if (m < 0) {
        y -= 1;
        m += 12;
    }

    // Actualiza la visualización de la edad
    day.textContent = d;
    month.textContent = m;
    year.textContent = y;

    // Oculta los mensajes de error
    errorMessage.forEach(error => {
        error.style.opacity = 0;
    });
}

// Evento
input.forEach((element, index) => {
    element.addEventListener("input", () => {
        toggleError(index, !element.value || isNaN(element.value));
        calculateAge();
    });
});

// Oculta los mensajes de error al principio
errorMessage.forEach(error => {
    error.style.opacity = 0;
});
