export default function (value) {
  if(value === null || value === undefined){
    return;
  }
  value = value.toString().replace(/,/g, '.');
  value = value.toString().replace(/[^0-9+\-\/*.]/g, '');
  return value;
}
