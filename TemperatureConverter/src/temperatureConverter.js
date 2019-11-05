document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var convertButton = document.getElementById("convert_button");
    var celsiusValue = document.getElementById("input_degrees");
    var kalvinValue = document.getElementById("result_calvin");
    var fahrenheitValue = document.getElementById("result_fahrenheit");
    var errorMessage = document.getElementById("error_message");

    convertButton.addEventListener("click", function () {
        var inputValue = celsiusValue.value;
        if (inputValue === "") {
            return;
        }
        kalvinValue.textContent = calcKalvinDegrees(inputValue);
        fahrenheitValue.textContent = calcFahrenheitDegrees(inputValue);

        if (parseFloat(inputValue) < -274.15) {
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    })
}

function calcKalvinDegrees(celsiusDegrees) {
    return parseFloat(celsiusDegrees) + 274.15;
}

function calcFahrenheitDegrees(celsiusDegrees) {
    return parseFloat(celsiusDegrees) * 1.8 + 32;
}
