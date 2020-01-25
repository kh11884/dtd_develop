import store from "../../store/index"

export var fullInfoRefinancingRateHistory = getFullInfoRefinancingRateHistory();

export function getFullInfoRefinancingRateHistory() {
  const refinancingRateHistory = store.state.refinancingRateHistory;
  refinancingRateHistory.reduce(function (memo, item) {
    memo.endDate = new Date(item.startDate);
    memo.endDate.setDate(memo.endDate.getDate() - 1);
    memo.days = Math.round((item.startDate - memo.startDate) / (1000 * 3600 * 24));
    return item;
  });
  //-- добавим в последний элемент конечную дату и число дней для нее, для стандартизированного подхода к дальнейшим рассчетам от элемента
  //-- можно добавить в кол-во дней 1, а в конечную дату текущую дату, чтобы не было лишних рассчетов.
  const endDate = new Date("12/31/2025"); //-- Дата до которой будет работает таблица
  const lastElement = refinancingRateHistory[refinancingRateHistory.length - 1];
  lastElement.endDate = endDate;
  lastElement.days = Math.round((lastElement.endDate - lastElement.startDate) / (1000 * 3600 * 24));

  return refinancingRateHistory;
}

export function getFilteredHistory(issueDate, applicationDate) {
  const filterHistory = fullInfoRefinancingRateHistory.filter(function (item) {
    return issueDate <= item.endDate
      && item.startDate <= applicationDate;
  });
  const filteredHistory = _.cloneDeep(filterHistory);

  filteredHistory[0].startDate = issueDate;
  filteredHistory[0].days = Math.round((filteredHistory[0].endDate - issueDate) / (1000 * 3600 * 24)) + 1;

  filteredHistory[filteredHistory.length - 1].endDate = applicationDate;
  filteredHistory[filteredHistory.length - 1].days = Math.round((applicationDate - filteredHistory[filteredHistory.length - 1].startDate) / (1000 * 3600 * 24)) + 1;

  return filteredHistory;
}

export function getCalcTable(issueDate, applicationDate, payment) {
  issueDate.setDate(issueDate.getDate() + 1);
  const period = getFilteredHistory(issueDate, applicationDate);
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  const result = [];

  period.forEach(function (item) {
    result.push({
      payment: payment,
      startDate: item.startDate.toLocaleString('ru-RU', options),
      endDate: item.endDate.toLocaleString('ru-RU', options),
      days: item.days,
      refinancing_rate: (item.refinancing_rate * 100).toFixed(2) + " %",
      sum: (payment * item.days * item.refinancing_rate / 360).toFixed(2),
      simpleRate: (item.refinancing_rate * 100).toFixed(2)
    });
  });
  return result;
}

export function getSumDaysTable(tableData) {
  return tableData.reduce(function (result, tableRow) {
    return result + parseFloat(tableRow.days);
  }, 0);
}

export function getSumPercents(tableData) {
  return Math.round(tableData.reduce(function (result, tableRow) {
    return result + parseFloat(tableRow.sum);
  }, 0) * 100) / 100;
}
