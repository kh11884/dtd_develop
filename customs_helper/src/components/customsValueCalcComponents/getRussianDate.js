import moment from 'moment';

export default function (data) {
  moment.locale('ru');
  return moment(data.substring(0, 10)).format("DD MMMM YYYY");
}
