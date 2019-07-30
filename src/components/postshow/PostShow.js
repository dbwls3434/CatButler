import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticles, setScrollPosition } from '../../actions/postshow';
import PostShowItem from './PostShowItem';
import Spinner from '../layout/Spinner';

const PostShow = ({
  getArticles,
  setScrollPosition,
  postshow: { articles, paging, listloading, scrollposition }
}) => {
  let curPage = paging && paging.curPage ? paging.curPage : 1;

  const goList = pageNo => {
    curPage = pageNo;
    getArticles(curPage);
  };

  const handleScrollPosition = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    if (!paging || !paging.curPage) {
      goList(curPage);
    }
    window.scrollTo(0, scrollposition);
  }, []);

  return listloading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> Board for mobile</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Click Type
      </p>
      <div className='postshow-list' onClick={e => handleScrollPosition()}>
        {articles && articles.length > 0 ? (
          articles.map(article => (
            <PostShowItem key={article._id} article={article} />
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
      <div className='postshow-btn-group'>
        {paging && paging.curPage < paging.totPages && (
          <button
            className='btn btn-primary postshow-btn-item'
            onClick={e => goList(parseInt(curPage) + 1)}
          >
            {`${paging.curPage} / ${paging.totPages}`} More
          </button>
        )}
      </div>
    </Fragment>
  );
};

PostShow.propTypes = {
  getArticles: PropTypes.func.isRequired,
  setScrollPosition: PropTypes.func.isRequired,
  postshow: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postshow: state.postshow
});

export default connect(
  mapStateToProps,
  { getArticles, setScrollPosition }
)(PostShow);
