import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from '../../components/layout/Alert';
import NotFound from '../../components/layout/NotFound';
import Register from '../../components/auth/Register';
import Login from '../../components/auth/Login';
import SocialLogin from '../../components/auth/SocialLogin';
import About from '../../components/etc/About';
import Board from '../../components/board/Board';
import Detail from '../../components/board/Detail';
import Write from '../../components/board/Write';
import Edit from '../../components/board/Edit';
import PostShow from '../../components/postshow/PostShow';
import PostShowDetail from '../../components/postshow/PostShowDetail';
import PostShow2 from '../../components/postshow2/PostShow2';
import PostShowDetail2 from '../../components/postshow2/PostShowDetail2';
import FileUpload from '../../components/upfile/FileUpload';
import GoogleMap from '../../components/maps/GoogleMap';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/socallogin' component={SocialLogin} />
        <Route exact path='/about' component={About} />
        <Route exact path='/board' component={Board} />
        <Route exact path='/board/detail/:id' component={Detail} />
        <Route exact path='/board/write' component={Write} />
        <Route exact path='/board/edit/:id' component={Edit} />
        <Route exact path='/postshow' component={PostShow} />
        <Route exact path='/postshow/detail/:id' component={PostShowDetail} />
        <Route exact path='/postshow2' component={PostShow2} />
        <Route exact path='/postshow2/detail/:id' component={PostShowDetail2} />
        <Route exact path='/fileupload' component={FileUpload} />
        <Route exact path='/googlemap' component={GoogleMap} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
