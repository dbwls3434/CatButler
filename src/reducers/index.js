import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import board from './board';
import postshow from './postshow';
import postshow2 from './postshow2';
import upfile from './upfile';

export default combineReducers({
  alert,
  auth,
  board,
  postshow,
  postshow2,
  upfile
});
