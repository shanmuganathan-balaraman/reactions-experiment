const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), {},
);

const findItemByVal = (arr, key, findBy) => arr.find(o => o[key] == findBy);

export {
  groupBy,
  findItemByVal
}