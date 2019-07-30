import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_SAVED,
  ARTICLE_UPDATED,
  ARTICLE_DELETED,
  ARTICLE_ERROR,
  PASS_PARAMS
} from './types';
import { async } from 'q';

/* 게시판 리스트 */
export const getArticles = ({ curPage, title }) => async dispatch => {
  try {
    const res = await axios.get('/api/board/list', {
      params: { curPage, title }
    });
    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 게시판 글 상세 */
export const getArticle = id => async dispatch => {
  try {
    const res = await axios.get(`/api/board/detail/${id}`);
    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 게시글 등록 */
export const saveArticle = ({ title, writer, content }) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };
  const body = { title, writer, content };
  try {
    await axios.post('/api/board/regist', body, config);
    dispatch({
      type: ARTICLE_SAVED
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 게시글 수정 */
export const editArticle = ({ id, title, content }) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };
  const body = { title, content };
  try {
    await axios.post(`/api/board/update/${id}`, body, config);
    dispatch({
      type: ARTICLE_UPDATED
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 게시판 글 삭제 */
export const deleteArticle = id => async dispatch => {
  try {
    await axios.delete(`/api/board/delete/${id}`);
    dispatch({
      type: ARTICLE_DELETED
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

/* 파라미터 넘기기 */
export const passParams = ({ curPage, title }) => dispatch => {
  dispatch({
    type: PASS_PARAMS,
    payload: { curPage, title }
  });
};
