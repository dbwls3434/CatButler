import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Paging = ({
  paging: {
    curPage,
    totRows,
    totPages,
    startPageNo,
    endPageNo,
    startEndPageArr
  },
  goList
}) => {
  return (
    <Fragment>
      <div className='pagination'>
        <ul className='page'>
          <li className='page-item'>
            <a className='page-link' onClick={e => goList(1)}>
              <span>&laquo;</span>
            </a>
          </li>
          {startPageNo > 1 && (
            <li className='page-item'>
              <a className='page-link' onClick={e => goList(startPageNo - 1)}>
                <span>&lt;</span>
              </a>
            </li>
          )}
          {startEndPageArr.map(page => (
            <li className='page-item' key={page}>
              {page == curPage ? (
                <p className='page-link page-link-selected'>{page}</p>
              ) : (
                <a className='page-link' onClick={e => goList(page)}>
                  {page}
                </a>
              )}
            </li>
          ))}
          {endPageNo < totPages && (
            <li className='page-item'>
              <a className='page-link' onClick={e => goList(endPageNo + 1)}>
                <span>&gt;</span>
              </a>
            </li>
          )}
          <li className='page-item'>
            <a className='page-link' onClick={e => goList(totPages)}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

Paging.propTypes = {
  paging: PropTypes.object.isRequired,
  goList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  paging: state.board.paging
});

export default connect(mapStateToProps)(Paging);
