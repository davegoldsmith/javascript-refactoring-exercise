
const processTransactions = (transActions) => {
  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {};

  //creates uniqueTransItems from transActions
  const uniqueTransItems = new Set(transActions);
  //counts the number of occurance for each item
  uniqueTransItems.forEach((item) => {
    txCount[item] =transActions.filter(ele => ele===item).length;
  });

  txCount = sortByAmountThenName(txCount);

  const txr = Object.keys(txCount).map((key) => `${key} ${txCount[key]}`);
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

const validateTransactions = (transactions) => transactions === undefined || transactions === null ? false : true;

module.exports = processTransactions;
