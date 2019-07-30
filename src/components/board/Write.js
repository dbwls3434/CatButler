import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { saveArticle } from '../../actions/board';

const Write = ({
  saveArticle,
  board: { loading, changed, error },
  auth,
  match
}) => {
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: ''
  });

  let { title, writer, content } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    saveArticle({ title, writer, content });
  };

  useEffect(() => {
    if (auth.user) {
      writer = auth.user.name;
      setFormData({ ...formData, writer: auth.user.name });
    }
  }, []);

  if (changed) {
    return <Redirect to='/board' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Board</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Write
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='board'>
          <table className='board-table'>
            <tbody>
              <tr>
                <th width='30%'>title</th>
                <td>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Title'
                      name='title'
                      value={title}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>writer</th>
                <td>
                  <div className='form-group'>
                    {auth && auth.user ? (
                      <input
                        type='text'
                        name='writer'
                        value={writer}
                        readOnly
                      />
                    ) : (
                      <input
                        type='text'
                        placeholder='Writer'
                        name='writer'
                        value={writer}
                        onChange={e => onChange(e)}
                        required
                      />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <th>content</th>
                <td>
                  <div className='form-group'>
                    <textarea
                      placeholder='Content'
                      name='content'
                      value={content}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {!(auth && auth.user) && (
            <div>
              <p>If you don't login, you can't edit or remove articles</p>
            </div>
          )}
          <div className='board-action'>
            <input type='submit' value='Save' className='btn btn-primary' />
            <Link to='/board' className='btn btn-primary'>
              GoList
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

Write.propTypes = {
  saveArticle: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  board: state.board,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { saveArticle }
)(Write);
