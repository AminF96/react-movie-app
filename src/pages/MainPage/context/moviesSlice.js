import { paths } from "../../../router/paths";
import {
  createMoviesRawArray,
  getSortedMoviesPages,
  fetchAllMovies,
  fetchSearchedMovies,
} from "./fetchMovies";

export const sortOrders = {
  NEWEST: "now_playing",
  POPULARITY: "popular",
  RATING: "top_rated",
};

export const actionTypes = {
  FETCH_ALL_MOVIES_SUCCESS: "allMovies/fetchMoviesSuccessful",
  FETCH_MOVIES_PENDING: "movies/fetchMoviesPending",
  FETCH_MOVIES_FAILED: "movies/fetchMoviesFailed",
  FETCH_SEARCHED_MOVIES_SUCCESS: "searchedMovies/fetchSearchedMoviesSuccess",
  CHANGE_SEARCHED_PAGE: "searchedMovies/change-page",
  SET_SEARCHED_MOVIES_SORT_ORDER: "searchedMovies/set-sort-order",
};

// Reducer -------------------------------------------------------------------------------------------

const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
      const { allMovies, totalPages, pageNum, sortOrder } = action.payload;
      newState = {
        ...state,
        entities: allMovies,
        totalPages,
        sortOrder,
        pageNum,
        isLoading: false,
        searchValue: null,
      };
      break;

    case actionTypes.FETCH_SEARCHED_MOVIES_SUCCESS:
      const { searchValue, searchedMovies, sort, pagesCount } = action.payload;
      newState = {
        ...state,
        searchValue,
        entities: searchedMovies,
        totalPages: pagesCount,
        pageNum: 1,
        sortOrder: sort,
        isLoading: false,
      };
      break;

    case actionTypes.FETCH_MOVIES_PENDING:
      newState = {
        ...state,
        entities: null,
        isLoading: true,
      };
      break;

    case actionTypes.CHANGE_SEARCHED_PAGE:
      newState = {
        ...state,
        pageNum: action.payload,
      };
      break;

    case actionTypes.SET_SEARCHED_MOVIES_SORT_ORDER:
      const { sortedMovies, newSortOrder } = action.payload;
      newState = {
        ...state,
        entities: sortedMovies,
        pageNum: 1,
        sortOrder: newSortOrder,
        isLoading: false,
      };
      break;

    case actionTypes.FETCH_MOVIES_FAILED:
      newState = {
        ...state,
        isLoading: false,
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

export default reducer;

// Action Factories ----------------------------------------------------------------------------------

export const fetchedAllMoviesSuccess = (
  allMovies,
  totalPages,
  pageNum,
  sortOrder
) => {
  return {
    type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
    payload: {
      allMovies,
      totalPages,
      pageNum,
      sortOrder,
    },
  };
};

export const fetchedSearchedMoviesSuccess = (searchValue, movies, sort) => {
  const searchedMovies = getSortedMoviesPages(movies, sort);

  return {
    type: actionTypes.FETCH_SEARCHED_MOVIES_SUCCESS,
    payload: {
      searchValue,
      searchedMovies,
      sort,
      pagesCount: Object.keys(searchedMovies).length,
    },
  };
};

export const fetchMoviesPending = () => {
  return {
    type: actionTypes.FETCH_MOVIES_PENDING,
    payload: null,
  };
};

export const ChangeSearchedPage = (newPageNum) => {
  return {
    type: actionTypes.CHANGE_SEARCHED_PAGE,
    payload: newPageNum,
  };
};

export const changeSearchedMoviesSortOrder = (movies, newSortOrder) => {
  return {
    type: actionTypes.SET_SEARCHED_MOVIES_SORT_ORDER,
    payload: {
      sortedMovies: getSortedMoviesPages(
        createMoviesRawArray(movies),
        newSortOrder
      ),
      newSortOrder,
    },
  };
};

export const fetchMoviesFailed = () => {
  return {
    type: actionTypes.FETCH_MOVIES_FAILED,
    payload: null,
  };
};

// Async Function Handlers -----------------------------------------------------------------------------------------

export const fetchAllMoviesHandler = async (
  dispatch,
  navigate,
  sort,
  newPage
) => {
  dispatch(fetchMoviesPending());

  try {
    const { page, results, total_pages } = await fetchAllMovies(sort, newPage);
    dispatch(fetchedAllMoviesSuccess(results, total_pages, page, sort));
    return "Success";
  } catch (error) {
    dispatch(fetchMoviesFailed());
    navigate(paths.ERROR, { replace: true });
    return error;
  }
};

export const fetchSearchedMoviesHandler = async (
  dispatch,
  navigate,
  searchValue,
  sort,
  page = null
) => {
  dispatch(fetchMoviesPending());

  try {
    const movies = await fetchSearchedMovies(searchValue);
    dispatch(fetchedSearchedMoviesSuccess(searchValue, movies, sort));
    page && dispatch(ChangeSearchedPage(page));
    return "Success";
  } catch (error) {
    dispatch(fetchMoviesFailed());
    navigate(paths.ERROR, { replace: true });
    return error;
  }
};
