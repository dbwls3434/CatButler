import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getArticle, deleteArticle } from '../../actions/board';
import Moment from 'react-moment';

const Detail = ({
  getArticle,
  deleteArticle,
  board: { article, changed, loading },
  auth,
  match
}) => {
  const removeArticle = () => {
    deleteArticle(match.params.id);
  };

  useEffect(() => {
    getArticle(match.params.id);
  }, []);

  if (changed) {
    return <Redirect to='/board' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    article && (
      <Fragment>
        <h1 className='large text-primary'>Board</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Detail
        </p>
        <div className='board'>
          <table className='board-table'>
            <tbody>
              <tr>
                <th width='30%'>title</th>
                <td>{article.title}</td>
              </tr>
              <tr>
                <th>writer</th>
                <td>{article.writer}</td>
              </tr>
              <tr>
                <th>content</th>
                <td>{article.content}</td>
              </tr>
              <tr>
                <th>date</th>
                <td>
                  <Moment format='YYYY-MM-DD'>{article.date}</Moment>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='board-action'>
            {article.user &&
              auth &&
              auth.user &&
              article.user == auth.user._id && (
                <Fragment>
                  <Link
                    to={`/board/edit/${match.params.id}`}
                    className='btn btn-primary'
                  >
                    GoEditing
                  </Link>
                  <a className='btn btn-primary' onClick={e => removeArticle()}>
                    Deleting
                  </a>
                </Fragment>
              )}
            <Link to='/board' className='btn btn-primary'>
              GoList
            </Link>
          </div>
        </div>
      </Fragment>
    )
  );
};

Detail.propTypes = {
  getArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  board: state.board,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getArticle, deleteArticle }
)(Detail);
