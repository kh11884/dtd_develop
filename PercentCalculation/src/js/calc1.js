function getRefinancingRateHistory() {
    return [
        {
            startDate: new Date("11/25/2009"),
            refinancing_rate: 0.09,
        },
        {
            startDate: new Date("12/28/2009"),
            refinancing_rate: 0.0875,
        },
        {
            startDate: new Date("02/24/2010"),
            refinancing_rate: 0.085,
        },
        {
            startDate: new Date("03/29/2010"),
            refinancing_rate: 0.0825,
        },
        {
            startDate: new Date("04/30/2010"),
            refinancing_rate: 0.08,
        },
        {
            startDate: new Date("06/01/2010"),
            refinancing_rate: 0.0775,
        },
        {
            startDate: new Date("02/28/2011"),
            refinancing_rate: 0.08,
        },
        {
            startDate: new Date("05/03/2011"),
            refinancing_rate: 0.0825,
        },
        {
            startDate: new Date("12/26/2011"),
            refinancing_rate: 0.08,
        },
        {
            startDate: new Date("09/14/2012"),
            refinancing_rate: 0.0825,
        },
        {
            startDate: new Date("04/07/2013"),
            refinancing_rate: 0.0825,
        },
        {
            startDate: new Date("01/01/2016"),
            refinancing_rate: 0.11,
        },
        {
            startDate: new Date("06/14/2016"),
            refinancing_rate: 0.105,
        },
        {
            startDate: new Date("09/19/2016"),
            refinancing_rate: 0.10,
        },
        {
            startDate: new Date("01/01/2017"),
            refinancing_rate: 0.10,
        },
        {
            startDate: new Date("03/27/2017"),
            refinancing_rate: 0.0975,
        },
        {
            startDate: new Date("05/02/2017"),
            refinancing_rate: 0.0925,
        },
        {
            startDate: new Date("06/19/2017"),
            refinancing_rate: 0.09,
        },
        {
            startDate: new Date("09/18/2017"),
            refinancing_rate: 0.085,
        },
        {
            startDate: new Date("10/30/2017"),
            refinancing_rate: 0.0825,
        },
        {
            startDate: new Date("12/18/2017"),
            refinancing_rate: 0.0775,
        },
        {
            startDate: new Date("02/12/2018"),
            refinancing_rate: 0.075,
        },
        {
            startDate: new Date("03/26/2018"),
            refinancing_rate: 0.0725,
        },
        {
            startDate: new Date("09/17/2018"),
            refinancing_rate: 0.075,
        },
        {
            startDate: new Date("12/17/2018"),
            refinancing_rate: 0.0775,
        },
        {
            startDate: new Date("06/17/2019"),
            refinancing_rate: 0.075,
        },
        {
            startDate: new Date("07/29/2019"),
            refinancing_rate: 0.0725,
        },
        {
            startDate: new Date("09/09/2019"),
            refinancing_rate: 0.07,
        },
        {
            startDate: new Date("10/28/2019"),
            refinancing_rate: 0.065,
        }
    ];
}

function getFullInfoRefinancingRateHistory() {
    var refinancingRateHistory = getRefinancingRateHistory();

    _.reduce(refinancingRateHistory, function (memo, item) {
        memo.endDate = new Date(item.startDate);
        memo.endDate.setDate(memo.endDate.getDate() - 1);
        memo.days = Math.round((item.startDate - memo.startDate) / (1000 * 3600 * 24));
        return item;
    });
    return refinancingRateHistory;
}


function getFilteredHistory(issueDate, applicationDate) {
    var filteredHistory = _.filter(getFullInfoRefinancingRateHistory(), function (item) {
        return issueDate <= item.endDate && item.startDate <= applicationDate
    });

    filteredHistory[0].startDate = issueDate;
    filteredHistory[0].days = Math.round((filteredHistory[0].endDate - issueDate) / (1000 * 3600 * 24)) + 1;

    filteredHistory[filteredHistory.length - 1].endDate = applicationDate;
    filteredHistory[filteredHistory.length - 1].days = Math.round((applicationDate - filteredHistory[filteredHistory.length - 1].startDate) / (1000 * 3600 * 24)) + 1;

    return filteredHistory;
}

function getCalcTable(payment, issueDate, applicationDate) {
    var period = getFilteredHistory(issueDate, applicationDate);

    _.each(period, function (item) {
        var row = $("<tr>");
        var cell1 = $("<td>").text(payment);
        var cell2 = $("<td>").text(item.startDate.toLocaleString('ru-RU', options));
        var cell3 = $("<td>").text(item.endDate.toLocaleString('ru-RU', options));
        var cell4 = $("<td>").text(item.days);
        var cell5 = $("<td>").text((item.refinancing_rate * 100).toFixed(2) + " %");
        var cell6 = $("<td>").text((payment * item.days * item.refinancing_rate / 360).toFixed(2));

        row.append(cell1)
            .append(cell2)
            .append(cell3)
            .append(cell4)
            .append(cell5)
            .append(cell6);
        tableBody.append(row);
    })
}

function createTableHead() {
    var rowHead1 = $("<tr>");
    rowHead1.append($("<th rowspan=\"2\">").text("Сп"))
        .append($("<th colspan=\"2\">").text("Период"))
        .append($("<th rowspan=\"2\">").text("Д"))
        .append($("<th rowspan=\"2\">").text("ст,%"))
        .append($("<th rowspan=\"2\">").text("Прс"));
    tableHead.append(rowHead1);
    var rowHead2 = $("<tr>");
    rowHead2.append($("<th>").text("начало"))
        .append($("<th>").text("конец"));

    tableHead.append(rowHead2);
}

function getSumDays(issueDate, applicationDate) {
    var period = getFilteredHistory(issueDate, applicationDate);

    return _.reduce(period, function (memo, item) {
        return memo += item.days;
    }, 0)
}


//TODO: проверить округление для каждой строки
function getSumPercent(payment, issueDate, applicationDate) {
    var period = getFilteredHistory(issueDate, applicationDate);

   var finResult = _.reduce(period, function (memo, item) {
        // var result = Number(Math.round((payment * item.days * item.refinancing_rate / 360) + 'e' + 2) + 'e-' + 2);
       var result = (payment * item.days * item.refinancing_rate / 360).toFixed(2);
        console.log(result);
        return memo += parseFloat(result);
    }, 0);

    console.log(finResult);
   return finResult.toFixed(2);
}

function createInfoTable(currentDate, UNPlatSum, platSum, days, percentSum) {
    var rowHead1 = $("<tr>").append($("<th>").text("Рассчет процентов за отсрочку таможенного платежа (5010 вид) от "))
        .append($("<th>").text(currentDate.toLocaleString('ru-RU', options)));
    var row2 = $("<tr>").append($("<td>").text("Сумма условно-начисленных платежей "))
        .append($("<td>").text(UNPlatSum));
    var row3 = $("<tr>").append($("<td>").text("Сумма платежа по которому предоставлена отсрочка "))
        .append($("<td>").text(platSum));
    var row4 = $("<tr>").append($("<td>").text("количество дней отсрочки "))
        .append($("<td>").text(days));
    var row5 = $("<tr>").append($("<td>").text("Сумма процентов за отсрочку таможенного платежа "))
        .append($("<td>").text(percentSum));

    infoTableHead.append(rowHead1);
    infoTableBody.append(row2)
        .append(row3)
        .append(row4)
        .append(row5);
}

var options = {year: 'numeric', month: 'short', day: 'numeric'};

var infoTableHead = $("#info_table_head");
var infoTableBody = $("#info_table_body");
var tableHead = $("#print_table_head");
var tableBody = $("#print_table_body");

//---Входные данные---//
var issueDate = new Date("05/31/2010");
var applicationDate = new Date("09/18/2017");
var payment = 10000;

//---вычисления для верхней таблицы---//
var days = getSumDays(issueDate, applicationDate);
var percentSum = getSumPercent(payment, issueDate, applicationDate);


createInfoTable(applicationDate, payment, 0, days, percentSum);
createTableHead();
getCalcTable(payment, issueDate, applicationDate);


















