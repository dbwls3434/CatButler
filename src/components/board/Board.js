import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticles, passParams } from '../../actions/board';
import Spinner from '../layout/Spinner';
import Paging from './Paging';
import Article from './Article';

const Board = ({
  getArticles,
  passParams,
  board: { articles, paging, listloading, passedParams }
}) => {
  const [formData, setFormData] = useState({
    curPage: 1,
    title: ''
  });

  let { curPage, title } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    goList(curPage);
  };

  const goList = pageNo => {
    curPage = pageNo;
    passParams({ curPage, title });
    getArticles({ curPage, title });
  };

  useEffect(() => {
    if (passedParams) {
      curPage = passedParams.curPage;
      title = passedParams.title;
      setFormData({ ...formData, curPage });
      setFormData({ ...formData, title });
    }
    goList(curPage);
  }, []);

  return listloading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Board</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Ordinary board - List
      </p>
      <div className='board'>
        <form className='form-search' onSubmit={e => onSubmit(e)}>
          <div className='form-search-group'>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={e => onChange(e)}
            />
            <input type='hidden' name='curPage' value={curPage} />
          </div>
          <div className='form-search-group'>
            <input type='submit' className='btn btn-primary' value='Search' />
          </div>
        </form>
        <div>
          <p>total :{paging.totRows}</p>
        </div>
        <table className='board-table'>
          <thead>
            <tr>
              <th width='10%'>No</th>
              <th width='30%'>Title</th>
              <th width='30%'>writer</th>
              <th width='30%'>Date</th>
            </tr>
          </thead>
          <tbody>
            {articles && articles.length > 0 ? (
              articles.map((article, index) => (
                <Article
                  key={article._id}
                  article={article}
                  paging={paging}
                  index={index}
                  formData={formData}
                />
              ))
            ) : (
              <tr>
                <td colSpan='4'>No data</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='board-action'>
          <Link to='/board/write' className='btn btn-primary'>
            GoWriting
          </Link>
        </div>
      </div>
      <Paging goList={goList} />
    </Fragment>
  );
};

Board.propTypes = {
  passParams: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  board: state.board
});

export default connect(
  mapStateToProps,
  { passParams, getArticles }
)(Board);
