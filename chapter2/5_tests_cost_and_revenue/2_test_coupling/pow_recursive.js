const pow = (a, b, acc = 1) => {
  if (b === 0) return acc;
  const nextB = b < 0 ? b + 1 : b - 1;
  const nextAcc = b < 0 ? acc / a : acc * a;
  return pow(a, nextB, nextAcc);
};

module.exports = pow;
