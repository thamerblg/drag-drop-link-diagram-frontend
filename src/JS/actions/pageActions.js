import {
  ADD_NEW_PAGES_FAIL,
  ADD_NEW_PAGES_SUCCESS,
  EDIT_PAGE_FAIL,
  EDIT_PAGE_SUCCESS,
  GET_ALL_PAGES_FAIL,
  GET_ALL_PAGES_SUCCESS,
  GET_ONE_PAGE_FAIL,
  GET_ONE_PAGE_SUCCESS,
  LOADING_PAGES,
  MAKE_CURRENT_EMPTY,
} from "../constants/actionsTypes";
import axios from "axios";

export const getAllPages = () => async (dispatch) => {
  dispatch({ type: LOADING_PAGES });
  try {
    const response = await axios.get("http://localhost:5000/pages/all");
    dispatch({
      type: GET_ALL_PAGES_SUCCESS,
      payload: response.data.allPages,
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PAGES_FAIL });
  }
};

export const addNewPage = (newPage) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/pages/add", newPage);
    dispatch({ type: ADD_NEW_PAGES_SUCCESS });
    dispatch(getAllPages());
  } catch (error) {
    dispatch({ type: ADD_NEW_PAGES_FAIL });
    console.log(error);
  }
};

export const getCurrentPage = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/pages/${id}`);

    dispatch({ type: GET_ONE_PAGE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ONE_PAGE_FAIL, payload: error });
  }
};

export const editPage = (id, currentPage) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/pages/${id}`, currentPage);
    dispatch({ type: EDIT_PAGE_SUCCESS });
    dispatch(getAllPages());
  } catch (error) {
    dispatch({ type: EDIT_PAGE_FAIL, payload: error });
  }
};

export const clearCurrent = () => {
  return {
    type: MAKE_CURRENT_EMPTY,
  };
};
