import { getSearchMovies } from "./getSearchMovies";

function createMoviesPagesObj(totalResults) {
  const resultsCount = totalResults.length;
  const pages = {};
  const pagesCount =
    parseInt(resultsCount / 20) + (resultsCount % 20 > 0 ? 1 : 0);

  for (let i = 1; i <= pagesCount; i++) {
    pages[i] = totalResults.splice(0, 20);
  }

  return pages;
}

async function getSearchMovieData(title) {
  const firstPageData = await getSearchMovies(title, "1");

  let unresolvePromises = [];

  for (let i = 1; i < firstPageData.total_pages; i++) {
    unresolvePromises.push(getSearchMovies(title, i + 1));
  }

  return {
    resolvedData: (await Promise.all(unresolvePromises)).map((data) => data),
    pagesInfo: firstPageData,
  };
}

// sortParam = popularity || vote_average
async function getSearchResultPages(title, sortParam) {
  const { resolvedData, pagesInfo } = await getSearchMovieData(title);

  let totalResults = [...pagesInfo.results];
  for (let index = 0; index < resolvedData.length; index++) {
    totalResults.push(...(await resolvedData[index]).results);
  }

  let descendingSort = totalResults
    .map((result) => result[sortParam])
    .sort((a, b) => a - b)
    .reverse();

  let sortedResults = [];
  descendingSort.map((item, index) => {
    if (item !== descendingSort[index - 1]) {
      sortedResults.push(
        ...totalResults.filter((result) => result[sortParam] == item)
      );
    }
  });

  const pages = createMoviesPagesObj(sortedResults);

  return pages;
}

export default getSearchResultPages;
