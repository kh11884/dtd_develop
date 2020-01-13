import getExpression from "./getExpression";

export default function (value) {
  if (value === null || value === undefined) {
    return;
  }
  return eval(getExpression(value));
}

