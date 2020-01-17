import moment from 'moment';

export default function (date) {
  moment.locale('ru');
  return moment(date.substring(0, 10)).format("DD MMM YY");
}
