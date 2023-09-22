const paginate = async (fn) => {
  let results = [];
  let paginationToken = null;
  do {
    const { PaginationToken, ...rest } = await fn(paginationToken);
    results = [...results, ...rest.Items];
    paginationToken = PaginationToken;
  } while (paginationToken);
  return results;
};

module.exports = paginate;
