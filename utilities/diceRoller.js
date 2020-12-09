const rollNotation = (diceString) => {
  if (diceString.match(/^[0-9]+$/)) {
    return parseInt(diceString, 10);
  }

  if (diceString.match(/(\+\+)|(--)|(\+-)|(-\+)/gm)
    || diceString.match(/[^d0-9()+\-*/]/gm)) {
    // Bad string.
    return null;
  }

  let temp = diceString;

  // This method will roll dice and replace the dice string with the result.
  let rollAndReplace = (str, diceString) => {
    let nums = diceString.split('d');
    let total = 0;
    for (let i = 0; i < parseInt(nums[0], 10); i++) {
      total += Math.floor(Math.random() * parseInt(nums[1], 10)) + 1;
    }
    return str.replace(diceString, total.toString());
  };

  // Roll each of the dice strings, replacing them in the string with the result.
  const diceMatches = diceString.match(/\d+d\d+/g);
  if (diceMatches) {
    diceMatches.forEach(d => {
      temp = rollAndReplace(temp, d);
    });
  }

  try {
    // eslint-disable-next-line
    return Math.floor(eval(temp));
  } catch (ex) {
    return null;
  }
};

exports.rollNotation = rollNotation;