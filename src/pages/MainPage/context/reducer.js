export const sortOrders = {
  NEWEST: "now_playing",
  POPULARITY: "popular",
  RATING: "top_rated",
};


export const actionTypes = {
  GET_INFO_SUCCESS: "get-info-success",
  CHANGE_PAGE: "change-page",
  SET_SORT_ORDER: "set-sort-order",
  SET_ALL_MOVIES: "set-all-movies",
  SET_SEARCH_SUBMIT: "set-search-submit",
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
      const { movieTitle, sort } = action.payload;
      newState = {
        ...state,
        isLoading: true,
        searchValue: movieTitle,
        pageNum: 1,
        sortOrder: sort || sortOrders.POPULARITY,
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};
