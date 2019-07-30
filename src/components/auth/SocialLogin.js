import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SocialLogin = props => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Social Login (After SSL)</h1>
      <p className='lead'>
        <i className='fas fa-user' /> auth via socal login - Not Working Now
      </p>
      <div className='sociallogin'>
        <div className='sociallogin-item'>
          <button
            className='btn sociallogin-btn'
            style={{
              backgroundColor: 'blue',
              color: 'white'
            }}
          >
            Facebook
          </button>
        </div>
        <div className='sociallogin-item'>
          <button
            className='btn sociallogin-btn'
            style={{
              backgroundColor: 'red',
              color: 'white'
            }}
          >
            Google
          </button>
        </div>
        <div className='sociallogin-item'>
          <button
            className='btn sociallogin-btn'
            style={{
              backgroundColor: 'yellow',
              color: 'black'
            }}
          >
            Kakao
          </button>
        </div>
        <div className='sociallogin-item'>
          <button
            className='btn sociallogin-btn'
            style={{
              backgroundColor: 'green',
              color: 'white'
            }}
          >
            Naver
          </button>
        </div>
      </div>
    </Fragment>
  );
};

SocialLogin.propTypes = {};

export default SocialLogin;
