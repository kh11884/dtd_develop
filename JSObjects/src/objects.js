function getCountries() {
    return [
        {
            name: "Франция",
            cities: [
                {
                    name: "Париж",
                    population: 2206488
                },
                {
                    name: "Марсель",
                    population: 870018
                },
                {
                    name: "Тулуза",
                    population: 482738
                },
                {
                    name: "Ницца",
                    population: 533554
                },
                {
                    name: "Лион",
                    population: 506615
                }
            ]
        },
        {
            name: "Германия",
            cities: [
                {
                    name: "Берлин",
                    population: 6010910
                },
                {
                    name: "Гановер",
                    population: 535061
                },
                {
                    name: "Франкфурт",
                    population: 746878
                },
                {
                    name: "Мюнхен",
                    population: 1456039
                },
                {
                    name: "Ингольштадт",
                    population: 137072
                },
                {
                    name: "Штудгард",
                    population: 623738
                }
            ]
        },
        {
            name: "Италия",
            cities: [
                {
                    name: "Рим",
                    population: 2872800
                },
                {
                    name: "Милан",
                    population: 1366180
                },
                {
                    name: "Венеция",
                    population: 260203
                },
                {
                    name: "Флоренция",
                    population: 380948
                },
                {
                    name: "Пиза",
                    population: 90118
                }
            ]
        },
        {
            name: "Испания",
            cities: [
                {
                    name: "Мадрид",
                    population: 3165235
                },
                {
                    name: "Барселона",
                    population: 1602386
                },
                {
                    name: "Валенсия",
                    population: 786424
                },
                {
                    name: "Пальма-де-Майорка",
                    population: 399093
                },
                {
                    name: "Севилья",
                    population: 696676
                }
            ]
        },
        {
            name: "Великобритания",
            cities: [
                {
                    name: "Лондон",
                    population: 8825000
                },
                {
                    name: "Ливерпуль",
                    population: 491500
                },
                {
                    name: "Манчестер",
                    population: 545500
                },
                {
                    name: "Бат",
                    population: 94782
                },
                {
                    name: "Виндзор",
                    population: 28324
                },
                {
                    name: "Манчестер",
                    population: 545500
                }
            ]
        }
    ];
}

function getMaxCitiesCount(countries) {
    return countries.reduce(function (maxValue, item) {
        return item.cities.length > maxValue ? item.cities.length : maxValue;
    }, 0);
}

function getMostCitiesCountries(countries) {
    var maxCitiesCount = getMaxCitiesCount(countries);

    return countries.filter(function (mostCitiesCountries) {
        return mostCitiesCountries.cities.length === maxCitiesCount;
    });
}

function getMostCitiesCountriesOneRun(countries) {
    var mostCitiesCountries = [];
    var maxCityCount = 0;

    countries.forEach(function (country) {
        if (maxCityCount === country.cities.length) {
            mostCitiesCountries.push(country);
        } else if (maxCityCount < country.cities.length) {
            maxCityCount = country.cities.length;
            mostCitiesCountries = [];
            mostCitiesCountries.push(country);
        }
    });

    return mostCitiesCountries;
}

function getSumPopulation(country) {
    return country.cities.reduce(function (sum, city) {
        return sum + city.population;
    }, 0);
}

function getCountriesPopulation(countries) {
    var countriesPopulation = {};

    countries.forEach(function (country) {
        countriesPopulation[country.name] = getSumPopulation(country);
    });

    return countriesPopulation;
}

console.log(getMostCitiesCountries(getCountries()));
console.log(getMostCitiesCountriesOneRun(getCountries()));
console.log(getCountriesPopulation(getCountries()));
