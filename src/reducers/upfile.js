import {
  FILE_LIST,
  FILE_UPLOADED,
  FILE_UPLOADED_DESTROY,
  FILE_UPLOAD_FAIL,
  FILE_DELETED,
  FILE_PROGRESS
} from '../actions/types';

const initialState = { filelist: [], fileone: {}, percentage: 0 };

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FILE_LIST:
      return {
        ...state,
        filelist: payload
      };
    case FILE_UPLOADED:
      return {
        ...state,
        fileone: payload,
        filelist: [payload, ...state.filelist]
      };
    case FILE_UPLOADED_DESTROY:
    case FILE_UPLOAD_FAIL:
      return {
        ...state,
        fileone: {}
      };
    case FILE_DELETED:
      return {
        ...state,
        filelist: state.filelist.filter(fileone => fileone._id !== payload)
      };
    case FILE_PROGRESS:
      return {
        ...state,
        percentage: payload
      };
    default:
      return state;
  }
}
