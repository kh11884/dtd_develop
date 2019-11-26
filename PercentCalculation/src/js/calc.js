function getRefinancingRateHistory() {
    return [
        {
            data: new Date("11/25/2009"),
            refinancing_rate: 0.09,
            days: 33
        },
        {
            data: new Date("12/28/2009"),
            refinancing_rate: 0.0875,
            days: 58
        },
        {
            data: new Date("02/24/2010"),
            refinancing_rate: 0.085,
            days: 33
        },
        {
            data: new Date("03/29/2010"),
            refinancing_rate: 0.0825,
            days: 32
        },
        {
            data: new Date("04/30/2010"),
            refinancing_rate: 0.08,
            days: 32
        },
        {
            data: new Date("06/01/2010"),
            refinancing_rate: 0.0775,
            days: 272
        },
        {
            data: new Date("02/28/2011"),
            refinancing_rate: 0.08,
            days: 64
        },
        {
            data: new Date("05/03/2011"),
            refinancing_rate: 0.0825,
            days: 237
        },
        {
            data: new Date("12/26/2011"),
            refinancing_rate: 0.08,
            days: 263
        },
        {
            data: new Date("09/14/2011"),
            refinancing_rate: 0.0825,
            days: 205
        },
        {
            data: new Date("04/07/2013"),
            refinancing_rate: 0.0825,
            days: 999
        },
        {
            data: new Date("01/01/2016"),
            refinancing_rate: 0.11,
            days: 165
        },
        {
            data: new Date("06/14/2016"),
            refinancing_rate: 0.105,
            days: 97
        },
        {
            data: new Date("09/19/2016"),
            refinancing_rate: 0.10,
            days: 104
        },
        {
            data: new Date("01/01/2017"),
            refinancing_rate: 0.10,
            days: 85
        },
        {
            data: new Date("03/27/2017"),
            refinancing_rate: 0.0975,
            days: 36
        },
        {
            data: new Date("05/02/2017"),
            refinancing_rate: 0.0925,
            days: 48
        },
        {
            data: new Date("06/19/2017"),
            refinancing_rate: 0.09,
            days: 91
        },
        {
            data: new Date("09/18/2017"),
            refinancing_rate: 0.085,
            days: 42
        },
        {
            data: new Date("10/30/2017"),
            refinancing_rate: 0.0825,
            days: 49
        },
        {
            data: new Date("12/18/2017"),
            refinancing_rate: 0.0775,
            days: 56
        },
        {
            data: new Date("02/12/2018"),
            refinancing_rate: 0.075,
            days: 42
        },
        {
            data: new Date("03/26/2018"),
            refinancing_rate: 0.0725,
            days: 175
        },
        {
            data: new Date("09/17/2018"),
            refinancing_rate: 0.075,
            days: 91
        },
        {
            data: new Date("12/17/2018"),
            refinancing_rate: 0.0775,
            days: 182
        },
        {
            data: new Date("06/17/2019"),
            refinancing_rate: 0.075,
            days: 42
        },
        {
            data: new Date("07/29/2019"),
            refinancing_rate: 0.0725,
            days: 42
        },
        {
            data: new Date("09/09/2019"),
            refinancing_rate: 0.07,
            days: 49
        },
        {
            data: new Date("10/28/2019"),
            refinancing_rate: 0.065,
            days: 431
        }
    ];
}

function getFirstPeriodDays(issueData) {
    var result = undefined;
    getRefinancingRateHistory().reduce(function (previos, item) {
        if (previos < issueData && issueData <= item.data) {
            result = Math.ceil((item.data - issueData) / (1000 * 3600 * 24));
        }
        return item.data;
    }, null);
    return result;
    // TODO: обратить внимание в конечном рассчете если дата выпуска ДТ позже чем дата последнего измеенния ставки.
    // TODO: сейчас функция выдает undefined
}

function getLastPeriodDays(filingDate) {
    var refinancingRateHistory = getRefinancingRateHistory();
    return Math.ceil((filingDate - refinancingRateHistory[refinancingRateHistory.length - 1].data) / (1000 * 3600 * 24));
}

function getFirstPeriodDays_alternate(issueData) {
    var refinancingRateHistory = getRefinancingRateHistory();
    var result = undefined;
    for (var i = 0; i < refinancingRateHistory.length - 1; i++) {
        result = Math.ceil((refinancingRateHistory[i].data - issueData) / (1000 * 3600 * 24));
        if (result > 0) {
            return result;
        }
    }
}

function getFirstPeriodRefinancingRate(issueDate) {
    var refinancingRateHistory = getRefinancingRateHistory();
    var days = undefined;
    for (var i = 0; i < refinancingRateHistory.length - 1; i++) {
        days = Math.ceil((refinancingRateHistory[i].data - issueDate) / (1000 * 3600 * 24));
        if (days > 0) {
            return refinancingRateHistory[i-1].refinancing_rate;
        }
    }
}


function calc (payment){
var period = getRefinancingRateHistory();

period.forEach(function(item){
    var row = $("<tr>");
    var cell1 = $("<td>").text(payment);
    var cell2 = $("<td>").text(item.data.toLocaleString('ru-RU', options));
    var cell3 = $("<td>").text(calcFinDate(item.data, item.days).toLocaleString('ru-RU', options));
    var cell4 = $("<td>").text(item.days);
    var cell5 = $("<td>").text((item.refinancing_rate * 100).toFixed(2) + " %");
    var cell6 = $("<td>").text((payment * item.days * item.refinancing_rate/360).toFixed(2));

    row.append(cell1)
        .append(cell2)
        .append(cell3)
        .append(cell4)
        .append(cell5)
        .append(cell6);
    tableBody.append(row);
})
}

function calcFinDate(startDate, days){
startDate.setDate(startDate.getDate() + days - 1);
return startDate;
}

function createTableHead(){
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

function createInfoTable(currentDate, UNPlatSum, platSum, days, percentSum){
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

function getCurrentPeriod(issueDate, applicationDate){
var currentPeriod = [];
currentPeriod.push(        {
                               data: issueDate,
                               refinancing_rate: getFirstPeriodRefinancingRate(issueDate),
                               days: getFirstPeriodDays_alternate(issueDate)
                           });



alert(currentPeriod[0].refinancing_rate);


//currentPeriod.push(        {
//                               data: applicationDate,
//                               refinancing_rate: 0.065,
//                               days: getFirstPeriodDays_alternate(issueDate)
//                           });
}

var options = { year: 'numeric', month: 'short', day: 'numeric' };

var infoTableHead = $("#info_table_head");
var infoTableBody = $("#info_table_body");
var tableHead = $("#print_table_head");
var tableBody = $("#print_table_body");

createInfoTable(new Date());
createTableHead();
calc(10000);
getCurrentPeriod(new Date("11/26/2009"), new Date("11/27/2009"));
















