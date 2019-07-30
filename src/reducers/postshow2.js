import {
  GET_SHOWPOSTS2,
  GET_SHOWPOST2,
  SHOWPOST_ERROR2,
  SHOWPOST_SCROLL2
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
    case GET_SHOWPOSTS2:
      return {
        ...state,
        articles: state.articles.concat(payload.list),
        paging: payload.paging,
        error: {},
        listloading: false,
        loading: true
      };
    case GET_SHOWPOST2:
      return {
        ...state,
        article: payload,
        error: {},
        //listloading: true,
        loading: false
      };
    case SHOWPOST_ERROR2:
      return {
        ...state,
        error: payload,
        listloading: true,
        loading: true
      };
    case SHOWPOST_SCROLL2:
      return {
        ...state,
        scrollposition: payload
      };
    default:
      return state;
  }
}
