import moment from 'moment';

export     function getFormatedData(unformattedData) {
  var year = unformattedData.substring(0, 4);
  var month = unformattedData.substring(5, 7);
  var day = unformattedData.substring(8, 10);
  return month + "/" + day + "/" + year;
}

export function getCorrectTimeZoneDate(date) {
  return (new Date(date - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
}

export  function getRussianDate (date) {
  moment.locale('ru');
  return moment(date.substring(0, 10)).format("DD MMM YYYY");
}

export function getFormattedDataFromExcelCell(excelData) {
  var year = excelData.substring(6, 10);
  var month = excelData.substring(3, 5);
  var day = excelData.substring(0, 2);
  return month + "/" + day + "/" + year;
}

export function getCorrectTimeZoneDateForPackageCalc(date) {
  return (new Date(date - (new Date()).getTimezoneOffset() * 60000));
}
