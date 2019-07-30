import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const openSlideMenu = e => {
    document.getElementById('side-menu').style.width = '250px';
  };

  const closeSlideMenu = e => {
    document.getElementById('side-menu').style.width = '0';
  };

  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            {' '}
            <i className='fas fa-cat' /> CatButler{' '}
          </Link>
        </h1>
        {!loading && (
          <ul className='nav-items'>
            {isAuthenticated ? (
              <Fragment>
                {user && user.name && (
                  <li className='hide-sm'>
                    <p>Hello, {`${user.name}`}~!</p>
                  </li>
                )}
                <li>
                  <a onClick={logout}>
                    <i className='fas fa-sign-out-alt' />
                    <span className='hide-sm'> LogOut</span>
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to='/register'>
                    <i className='far fa-registered' />
                    <span className='hide-sm'> Register</span>
                  </Link>
                </li>
                <li>
                  <Link to='/login'>
                    <i className='fas fa-sign-in-alt' />
                    <span className='hide-sm'> LogIn</span>
                  </Link>
                </li>
              </Fragment>
            )}
            <li className='nav-hamburger'>
              <Link to='#!' onClick={e => openSlideMenu(e)}>
                <i className='fas fa-bars fa-2x' />
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <div id='side-menu' className='side-nav'>
        <a href='#' className='btn-close' onClick={e => closeSlideMenu(e)}>
          <i className='far fa-times-circle' />
        </a>
        <Link to='/about' onClick={e => closeSlideMenu(e)}>
          한국어인사
        </Link>
        <Link to='/socallogin' onClick={e => closeSlideMenu(e)}>
          SocialLogin
        </Link>
        <Link to='/board' onClick={e => closeSlideMenu(e)}>
          Board
        </Link>
        <Link to='/postshow' onClick={e => closeSlideMenu(e)}>
          MobileBoard
        </Link>
        <Link to='/postshow2' onClick={e => closeSlideMenu(e)}>
          MobileBoard2
        </Link>
        <Link to='/fileupload' onClick={e => closeSlideMenu(e)}>
          ImageUpload
        </Link>
        <Link to='/googlemap' onClick={e => closeSlideMenu(e)}>
          GoogleMap
        </Link>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
