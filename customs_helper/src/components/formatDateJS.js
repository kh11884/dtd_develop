import moment from 'moment';

export function getRuDate(data) {
  moment.locale('ru');
  return moment(data.substring(0, 10)).format("DD MMMM YYYY");
}

export function parseNumber(value) {
  var result = value.toString().replace(/,/g, '.');
  return parseFloat(result);
}
