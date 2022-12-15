let txr = [];

const processTransactions = (transActions) => {
  txr = [];

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {};

  transActions.forEach((transaction) =>
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1)
  );

  txCount = sortByAmountThenName(txCount);

  txr = Object.keys(txCount).map((key) => `${key} ${txCount[key]}`);
  return txr;
};

const sortByAmountThenName = (txCount) => {
  const sortedKeys = Object.keys(txCount).sort(
    (itemOne, itemTwo) =>
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo)
  );

  const sortedResults = {};
  for (let objectKey of sortedKeys) {
    sortedResults[objectKey] = txCount[objectKey];
  }

  return sortedResults;
};

const validateTransactions = (transactions) => transactions === undefined ? false : true;

module.exports = processTransactions;
