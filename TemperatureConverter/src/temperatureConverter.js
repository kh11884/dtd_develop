function calcKelvinDegrees(celsiusDegrees) {
    return parseFloat(celsiusDegrees) + 273.15;
}

function calcFahrenheitDegrees(celsiusDegrees) {
    return parseFloat(celsiusDegrees) * 1.8 + 32;
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var convertButton = document.getElementById("convert_button");
    var celsiusValue = document.getElementById("input_degrees");
    var kelvinValue = document.getElementById("result_kelvin");
    var fahrenheitValue = document.getElementById("result_fahrenheit");
    var calcErrorMessage = document.getElementById("calc_error_message");

    convertButton.addEventListener("click", function () {
        var inputValue = celsiusValue.value;
        if (inputValue === "") {
            return;
        }

        kelvinValue.textContent = calcKelvinDegrees(inputValue);
        fahrenheitValue.textContent = calcFahrenheitDegrees(inputValue);

        if (parseFloat(inputValue) < -273.15) {
            calcErrorMessage.style.display = "block";
        } else {
            calcErrorMessage.style.display = "none";
        }
    })
}