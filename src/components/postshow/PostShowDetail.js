import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getArticle } from '../../actions/postshow';
import Spinner from '../layout/Spinner';

const PostShowDetail = ({
  getArticle,
  postshow: { article, loading },
  match
}) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    article && (
      <Fragment>
        <h1 className='large text-primary'>Board for mobile</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Detail
        </p>
        <div className='postshow-detail'>
          <div>
            <h3>Title</h3>
            <p>{article.title}</p>
          </div>
          <div>
            <h3>Content</h3>
            <p>{article.content}</p>
          </div>
        </div>
        <div className='postshow-btn-group'>
          <Link to='/postshow' className='btn btn-primary postshow-btn-item'>
            GoList
          </Link>
        </div>
      </Fragment>
    )
  );
};

PostShowDetail.propTypes = {
  getArticle: PropTypes.func.isRequired,
  postshow: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postshow: state.postshow
});

export default connect(
  mapStateToProps,
  { getArticle }
)(PostShowDetail);
