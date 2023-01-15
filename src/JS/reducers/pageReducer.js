import {
  ADD_NEW_PAGES_FAIL,
  EDIT_PAGE_FAIL,
  EDIT_PAGE_SUCCESS,
  GET_ALL_PAGES_FAIL,
  GET_ALL_PAGES_SUCCESS,
  GET_ONE_PAGE_FAIL,
  GET_ONE_PAGE_SUCCESS,
  LOADING_PAGES,
  MAKE_CURRENT_EMPTY,
} from "../constants/actionsTypes";

const initialState = {
  loading: false,
  pages: [],
  error: null,
  currentPage: [],
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PAGES:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload,
      };
    case GET_ALL_PAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_NEW_PAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ONE_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: action.payload,
      };
    case GET_ONE_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: [],
      };
    case EDIT_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case MAKE_CURRENT_EMPTY:
      return {
        ...state,
        currentPage: [],
      };

    default:
      return state;
  }
};
