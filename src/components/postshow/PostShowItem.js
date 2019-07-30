import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostShowItem = ({ article }) => {
  return (
    <div className='postshow-list-item' id={`${article._id}`}>
      <h3>
        <Link
          to={{
            pathname: `/postshow/detail/${article._id}`
          }}
        >
          {article.title}
        </Link>
      </h3>
      <p>{article.content}</p>
    </div>
  );
};

PostShowItem.propTypes = {
  article: PropTypes.object.isRequired
};

export default PostShowItem;
