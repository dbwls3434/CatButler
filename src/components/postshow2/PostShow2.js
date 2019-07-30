import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { getArticles, setScrollPosition } from '../../actions/postshow2';
import PostShowItem2 from './PostShowItem2';
import Spinner from '../layout/Spinner';

const PostShow2 = ({
  getArticles,
  setScrollPosition,
  postshow2: { articles, paging, listloading, scrollposition }
}) => {
  let curPage = paging && paging.curPage ? paging.curPage : 1;

  const goList = pageNo => {
    curPage = pageNo;
    getArticles(curPage);
  };

  const handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (paging && paging.curPage < paging.totPages) {
        goList(parseInt(curPage) + 1);
      }
    }
  };

  const handleScrollPosition = () => {
    setScrollPosition(window.scrollY);
  };

  useBottomScrollListener(handleScroll);

  useEffect(() => {
    goList(curPage);
    window.scrollTo(0, scrollposition);
  }, []);

  return listloading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> Board2 for mobile</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Infinate Scroll Type
      </p>
      <div className='postshow2-list' onClick={e => handleScrollPosition()}>
        {articles && articles.length > 0 ? (
          articles.map(article => (
            <PostShowItem2 key={article._id} article={article} />
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
    </Fragment>
  );
};

PostShow2.propTypes = {
  getArticles: PropTypes.func.isRequired,
  setScrollPosition: PropTypes.func.isRequired,
  postshow2: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postshow2: state.postshow2
});

export default connect(
  mapStateToProps,
  { getArticles, setScrollPosition }
)(PostShow2);
