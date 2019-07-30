import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SHOWPOSTS,
  GET_SHOWPOST,
  SHOWPOST_ERROR,
  SHOWPOST_SCROLL
} from './types';

/* 게시판 리스트 */
export const getArticles = curPage => async dispatch => {
  try {
    const res = await axios.get('/api/board/list', {
      params: { curPage }
    });
    dispatch({
      type: GET_SHOWPOSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SHOWPOST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 게시판 글 상세 */
export const getArticle = id => async dispatch => {
  try {
    const res = await axios.get(`/api/board/detail/${id}`);
    dispatch({
      type: GET_SHOWPOST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SHOWPOST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 스크롤 */
export const setScrollPosition = position => async dispatch => {
  dispatch({
    type: SHOWPOST_SCROLL,
    payload: position
  });
};
