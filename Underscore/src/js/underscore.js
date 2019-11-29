var people = [
    {
        name: "Ivan",
        lastName: "Ivanov",
        age: 20
    },
    {
        name: "Petr",
        lastName: "Petrov",
        age: 30
    },
    {
        name: "Semen",
        lastName: "Semenov",
        age: 17
    },
    {
        name: "Svetlana",
        lastName: "Svetlaya",
        age: 22
    },
    {
        name: "Oksana",
        lastName: "Lishnyaya",
        age: 14
    },
    {
        name: "Igor",
        lastName: "Kopernik",
        age: 38
    },
    {
        name: "Egor",
        lastName: "Perechniy",
        age: 37
    },
    {
        name: "Konstantin",
        lastName: "Belyaev",
        age: 28
    },
    {
        name: "Oleg",
        lastName: "Medvedev",
        age: 23
    },
    {
        name: "Stepan",
        lastName: "Razin",
        age: 77
    },
    {
        name: "Sergey",
        lastName: "Vorobey",
        age: 18
    }
];

var averageAge = _.reduce(people, function (sum, item) {
    return sum + item.age;
}, 0) / _.size(people);

var from20To30AgePeople = _.chain(people)
    .filter(function (item) {
        return 20 <= item.age && item.age <= 30
    })
    .sortBy("age")
    .value();

_.each(people, function (item) {
    item.fullName = item.name + " " + item.lastName;
});

console.log(people);
console.log("Средний возраст - " + averageAge);
console.log(from20To30AgePeople);
console.log(people);