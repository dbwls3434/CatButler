import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostShowItem2 = ({ article }) => {
  return (
    <div className='postshow2-list-item' id={`${article._id}`}>
      <h3>
        <Link
          to={{
            pathname: `/postshow2/detail/${article._id}`
          }}
        >
          {article.title}
        </Link>
      </h3>
      <p>{article.content}</p>
    </div>
  );
};

PostShowItem2.propTypes = {
  article: PropTypes.object.isRequired
};

export default PostShowItem2;
