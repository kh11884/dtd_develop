<template>
  <tbody>
  <tr v-for="item in resultTable" :key="item.startDate">
    <td>{{ item.payment }}</td>
    <td>{{ item.startDate }}</td>
    <td>{{ item.endDate }}</td>
    <td>{{item.days}}</td>
    <td>{{item.refinancing_rate}}</td>
    <td>{{item.sum}}</td>
  </tr>
    </tbody>
</template>

<script>
    import store from "../store/index";

    function getFullInfoRefinancingRateHistory() {
        var refinancingRateHistory = store.state.refinancingRateHistory;

        refinancingRateHistory.reduce(function (memo, item) {
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
        var filteredHistory = getFullInfoRefinancingRateHistory().filter(function (item) {
            return issueDate <= item.endDate && item.startDate <= applicationDate
        });
        console.log(filteredHistory);

        filteredHistory[0].startDate = issueDate;
        filteredHistory[0].days = Math.round((filteredHistory[0].endDate - issueDate) / (1000 * 3600 * 24)) + 1;

        filteredHistory[filteredHistory.length - 1].endDate = applicationDate;
        filteredHistory[filteredHistory.length - 1].days = Math.round((applicationDate - filteredHistory[filteredHistory.length - 1].startDate) / (1000 * 3600 * 24)) + 1;

        return filteredHistory;
    }

    function getCalcTable() {
        var payment = store.state.payment;
        var issueDate = store.state.issueDate;
        var applicationDate = store.state.applicationDate;


        var period = getFilteredHistory(issueDate, applicationDate);
        var options = {year: 'numeric', month: 'short', day: 'numeric'};
        var result = [];
        period.forEach(function (item) {
            result.push({
                payment: payment,
                startDate: item.startDate.toLocaleString('ru-RU', options),
                endDate: item.endDate.toLocaleString('ru-RU', options),
                days: item.days,
                refinancing_rate: (item.refinancing_rate * 100).toFixed(2) + " %",
                sum: (payment * item.days * item.refinancing_rate / 360).toFixed(2)
            });
        });
        return result;
    }

    export default {
        name: "percentCalculationTable",
        data() {
          return {
              resultTable: getCalcTable()
          }
        }
    }
</script>

<style scoped>

</style>
