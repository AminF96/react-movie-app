import { actionTypes } from "./reducer";

export const getInfoSuccessAction = (result) => {
  return {
    type: actionTypes.GET_INFO_SUCCESS,
    payload: {
      result,
      pagesCount: Object.keys(result).length,
      isLoading: false,
    },
  };
};

export const getChangePageAction = (updatedPageNum) => {
  return {
    type: actionTypes.CHANGE_PAGE,
    payload: updatedPageNum,
  };
};

export const getSetSortOrderAction = (sortOrder) => {
  return {
    type: actionTypes.SET_SORT_ORDER,
    payload: sortOrder,
  };
};

export const getSetAllMoviesAction = () => {
  return {
    type: actionTypes.SET_ALL_MOVIES,
    payload: null,
  };
};

export const getSetSearchSubmitAction = (movieTitle) => {
  return {
    type: actionTypes.SET_SEARCH_SUBMIT,
    payload: movieTitle,
  };
};
