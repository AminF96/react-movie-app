import { sortOrders } from "./sortOrderParams";

export const actionTypes = {
  GET_INFO_SUCCESS: "get-info-success",
  CHANGE_PAGE: "change-page",
  SET_SORT_ORDER: "set-sort-order",
  SET_ALL_MOVIES: "set-all-movies",
  SET_SEARCH_SUBMIT: "set-search-submit",
};

export const initState = {
  searchValue: null,
  sortOrder: sortOrders.NEWEST,
  isLoading: true,
  pageNum: 1,
  pagesCount: 0,
  result: null,
};

export const reducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.GET_INFO_SUCCESS:
      newState = {
        ...state,
        result: action.payload.result,
        pagesCount: action.payload.pagesCount,
        isLoading: false,
      };
      break;

    case actionTypes.CHANGE_PAGE:
      newState = {
        ...state,
        isLoading: state.searchValue === null,
        pageNum: action.payload,
      };
      break;

    case actionTypes.SET_SORT_ORDER:
      newState = {
        ...state,
        isLoading: state.sortOrder !== action.payload,
        pageNum: 1,
        sortOrder: action.payload,
      };
      break;

    case actionTypes.SET_ALL_MOVIES:
      newState = {
        ...state,
        isLoading: state.searchValue !== null,
        searchValue: null,
        sortOrder: sortOrders.NEWEST,
        pageNum: 1,
      };
      break;

    case actionTypes.SET_SEARCH_SUBMIT:
      newState = {
        ...state,
        isLoading: true,
        searchValue: action.payload,
        pageNum: 1,
        sortOrder:
          state.sortOrder === sortOrders.NEWEST
            ? sortOrders.POPULARITY
            : state.sortOrder,
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};
