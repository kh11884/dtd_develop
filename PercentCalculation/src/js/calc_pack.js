function createPackTable(inputData) {
    var rowHead1 = $("<tr>").append($("<th>").text("ДТ"))
        .append($("<th>").text("Дата ОТ"))
        .append($("<th>").text("Дата ДО"))
        .append($("<th>").text("НДС"))
        .append($("<th>").text("%"));
        packTableHead.append(rowHead1);

        _.each(inputData.DTs, function (item){
               var percent = getSumPercent(item.payment, item.issueDate, inputData.applicationDate);
               var packTableRow = $("<tr>")
                        .append($("<td>").text(item.DT))
                        .append($("<td>").text(item.issueDate.toLocaleString('ru-RU', options)))
                        .append($("<td>").text(inputData.applicationDate.toLocaleString('ru-RU', options)))
                        .append($("<td>").text(item.payment))
                        .append($("<td>").text(percent));
               packTableBody.append(packTableRow)
        });
}

var options = {year: 'numeric', month: 'short', day: 'numeric'};
var packTableHead = $("#pack_table_head");
var packTableBody = $("#pack_table_body");


createPackTable(getInputData());


















