document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var convertButton = document.getElementById("convertButton");
    var celsiusValue = document.getElementById("inputDegrees");
    var kalvinValue = document.getElementById("resultCalvin");
    var fahrenheitValue = document.getElementById("resultFahrenheit");
    var errorMessage = document.getElementById("errorMessage");

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
