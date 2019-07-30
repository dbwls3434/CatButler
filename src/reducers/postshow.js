import {
  GET_SHOWPOSTS,
  GET_SHOWPOST,
  SHOWPOST_ERROR,
  SHOWPOST_SCROLL
} from '../actions/types';

const initialState = {
  articles: [],
  paging: null,
  article: {},
  error: {},
  listloading: true,
  loading: true,
  scrollposition: 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHOWPOSTS:
      return {
        ...state,
        articles: state.articles.concat(payload.list),
        paging: payload.paging,
        error: {},
        listloading: false,
        loading: true
      };
    case GET_SHOWPOST:
      return {
        ...state,
        article: payload,
        error: {},
        //listloading: true,
        loading: false
      };
    case SHOWPOST_ERROR:
      return {
        ...state,
        error: payload,
        listloading: true,
        loading: true
      };
    case SHOWPOST_SCROLL:
      return {
        ...state,
        scrollposition: payload
      };
    default:
      return state;
  }
}
