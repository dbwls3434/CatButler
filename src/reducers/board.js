import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  ARTICLE_SAVED,
  ARTICLE_UPDATED,
  ARTICLE_DELETED,
  PASS_PARAMS
} from '../actions/types';

const initialState = {
  articles: [],
  paging: null,
  article: {},
  passedParams: {},
  listloading: true,
  loading: true,
  changed: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload.list,
        paging: payload.paging,
        listloading: false,
        loading: true,
        changed: false,
        error: {}
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        //listloading: true,
        loading: false,
        changed: false,
        error: {}
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: payload,
        listloading: true,
        loading: true,
        changed: false
      };
    case ARTICLE_SAVED:
    case ARTICLE_UPDATED:
    case ARTICLE_DELETED:
      return {
        ...state,
        listloading: true,
        loading: true,
        changed: true,
        error: {}
      };
    case PASS_PARAMS:
      return {
        ...state,
        passedParams: payload
      };
    default:
      return state;
  }
}
