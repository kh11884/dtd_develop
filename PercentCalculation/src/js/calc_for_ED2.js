function getFullInfoRefinancingRateHistory() {
    var refinancingRateHistory = getRefinancingRateHistory();

    _.reduce(refinancingRateHistory, function (memo, item) {
        memo.endDate = new Date(item.startDate);
        memo.endDate.setDate(memo.endDate.getDate() - 1);
        memo.days = Math.round((item.startDate - memo.startDate) / (1000 * 3600 * 24));
        return item;
    });

    //-- добавим в последний элемент конечную дату и число дней для нее, для стандартизированного подхода к дальнейшим рассчетам от элемента
    //-- можно добавить в кол-во дней 1, а в конечную дату текущую дату, чтобы не было лишних рассчетов.
    var endDate = new Date("12/31/2025"); //-- Дата до которой будет работает таблица
    var lastElement = refinancingRateHistory[refinancingRateHistory.length -1 ];
    lastElement.endDate = endDate;
    lastElement.days =  Math.round((lastElement.endDate - lastElement.startDate) / (1000 * 3600 * 24));

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
       var result = (payment * item.days * item.refinancing_rate / 360).toFixed(2);
        return memo += parseFloat(result);
    }, 0);

   return finResult.toFixed(2);
}

function createInfoTable(currentDate, UNPlatSum, platSum, days, percentSum) {
    var rowHead1 = $("<tr>").append($("<th>").text("Расчет процентов за отсрочку таможенного платежа (5010 вид) от "))
        .append($("<th>").text(currentDate.toLocaleString('ru-RU', options)));
    var rowHead2 = $("<tr>").append($("<th colspan=\"2\">").text("Прс =  Сп х Д х Ст / (360 х 100%)"));
    var row2 = $("<tr>").append($("<td>").text("Сумма условно-начисленных платежей "))
        .append($("<td>").text(UNPlatSum));
    var row3 = $("<tr>").append($("<td>").text("Сумма платежа по которому предоставлена отсрочка "))
        .append($("<td>").text(platSum));
    var row4 = $("<tr>").append($("<td>").text("количество дней отсрочки "))
        .append($("<td>").text(days));
    var row5 = $("<tr>").append($("<td>").text("Сумма процентов за отсрочку таможенного платежа "))
        .append($("<td>").text(percentSum));


    infoTableHead.append(rowHead1)
        .append(rowHead2);
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
var issueDate = new Date("12/31/2019");
var applicationDate = new Date("01/08/2020");
var payment = 10000;

//---вычисления для верхней таблицы---//
var days = getSumDays(issueDate, applicationDate);
var percentSum = getSumPercent(payment, issueDate, applicationDate);


createInfoTable(applicationDate, payment, payment, days, percentSum);
createTableHead();
getCalcTable(payment, issueDate, applicationDate);


















