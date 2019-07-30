import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getArticle } from '../../actions/postshow2';
import Spinner from '../layout/Spinner';

const PostShowDetail2 = ({
  getArticle,
  postshow2: { article, loading },
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
        <h1 className='large text-primary'>Board2 for mobile</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Detail
        </p>
        <div className='postshow2-detail'>
          <div>
            <h3>Title</h3>
            <p>{article.title}</p>
          </div>
          <div>
            <h3>Content</h3>
            <p>{article.content}</p>
          </div>
        </div>
        <div className='postshow2-btn-group'>
          <Link to='/postshow2' className='btn btn-primary postshow2-btn-item'>
            GoList
          </Link>
        </div>
      </Fragment>
    )
  );
};

PostShowDetail2.propTypes = {
  getArticle: PropTypes.func.isRequired,
  postshow2: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postshow2: state.postshow2
});

export default connect(
  mapStateToProps,
  { getArticle }
)(PostShowDetail2);
