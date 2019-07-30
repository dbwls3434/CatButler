import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Article = ({
  article: { _id, title, writer, date },
  paging: { totRows, skipRowNoForQuery },
  index,
  formData
}) => {
  useEffect(() => {
    //console.log('Article:formData==>' + JSON.stringify(formData));
  });

  return (
    <tr>
      <td>{totRows - skipRowNoForQuery - index}</td>
      <td>
        <Link
          to={{
            pathname: `/board/detail/${_id}`,
            passProps: { curPage: formData.curPage, title: formData.title }
          }}
        >
          {title}
        </Link>
      </td>
      <td>{writer}</td>
      <td>
        <Moment format='YYYY-MM-DD'>{date}</Moment>
      </td>
    </tr>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  paging: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired
};

export default Article;
