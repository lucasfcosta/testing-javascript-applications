function sumOrDivide(a, b) {
  if (a % 2 === 0 && b % 2 === 0) {
    return a + b;
  } else {
    return a / b;
  }
}

module.exports = sumOrDivide;
