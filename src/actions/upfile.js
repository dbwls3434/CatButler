import axios from 'axios';
import { setAlert } from './alert';
import {
  FILE_LIST,
  FILE_UPLOADED,
  FILE_UPLOADED_DESTROY,
  FILE_UPLOAD_FAIL,
  FILE_DELETED,
  FILE_PROGRESS
} from './types';

export const fileUpload = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.post('/api/upfile/fileupload', formData, config);

    dispatch({
      type: FILE_UPLOADED,
      payload: res.data
    });

    setTimeout(() => {
      dispatch({
        type: FILE_UPLOADED_DESTROY
      });
    }, 5000);
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setAlert('There was a problem with the server', 'danger'));
    } else {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
    dispatch({
      type: FILE_UPLOAD_FAIL
    });
  }
};

export const fileDownload = filepath => async dispatch => {
  try {
    const res = await axios({
      url: `/api/upfile/filedownload/${filepath}`,
      method: 'GET',
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filepath);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setAlert('There was a problem with the server', 'danger'));
    } else {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};

export const deleteFile = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/upfile/delete/${id}`);

    dispatch({
      type: FILE_DELETED,
      payload: id
    });
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setAlert('There was a problem with the server', 'danger'));
    } else {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};

export const fileList = () => async dispatch => {
  try {
    const res = await axios.get('/api/upfile/list');

    dispatch({
      type: FILE_LIST,
      payload: res.data
    });
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setAlert('There was a problem with the server', 'danger'));
    } else {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
    dispatch({
      type: FILE_UPLOAD_FAIL
    });
  }
};
