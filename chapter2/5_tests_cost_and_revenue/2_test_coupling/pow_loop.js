const pow = (a, b) => {
  let result = 1;
  for (let i = 0; i < Math.abs(b); i++) {
    if (b < 0) result = result / a;
    if (b > 0) result = result * a;
  }

  return result;
};

module.exports = pow;
