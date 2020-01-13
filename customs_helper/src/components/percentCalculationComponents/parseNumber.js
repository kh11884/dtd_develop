export default function parseNumber(value) {
  var result = value.toString().replace(/,/g, '.');
  return parseFloat(result);
}


