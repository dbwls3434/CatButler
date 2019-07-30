import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fileUpload,
  fileDownload,
  deleteFile,
  fileList
} from '../../actions/upfile';
import FileListItem from './FileListItem';

const FileUpload = ({
  fileUpload,
  fileDownload,
  deleteFile,
  fileList,
  upfile: { filelist, fileone },
  auth
}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose file');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSetTitle = e => {
    setTitle(e.target.value);
  };

  const onSetContent = e => {
    setContent(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);

    fileUpload(formData);
  };

  let progress = 0;

  if (fileone && fileone.filePath) {
    progress = 100;
  }

  useEffect(() => {
    fileList();
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Image Upload</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Upload, Download, AWS S3
      </p>
      <form className='form form-fileupload' onSubmit={e => onSubmit(e)}>
        <div className='form-search-group'>
          <input id='file' type='file' onChange={e => onChange(e)} />
        </div>
        <div className='form-search-group'>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='Title'
            onChange={e => onSetTitle(e)}
          />
        </div>
        <div className='form-search-group'>
          <input
            type='text'
            name='content'
            value={content}
            placeholder='Content'
            onChange={e => onSetContent(e)}
          />
        </div>
        <div className='form-search-action'>
          {auth && auth.user ? (
            <input type='submit' className='btn btn-primary' value='Upload' />
          ) : (
            <p>To upload a file, you need to login first.</p>
          )}
        </div>
      </form>
      <div className='progress'>
        <div>
          <div className={`progress-bar progress-bar-${progress}`} />
        </div>
      </div>
      {fileone && fileone.filePath && (
        <div>
          <div>
            <h3>{`${fileone.title}`}</h3>
            <p>{`${fileone.content}`}</p>
            <img src={`${fileone.upFilePath}`} />
          </div>
        </div>
      )}
      <div className='file-group'>
        <div className='file-list'>
          {filelist && filelist.length > 0
            ? filelist.map(fileone => (
                <FileListItem
                  key={fileone._id}
                  fileone={fileone}
                  fileDownload={fileDownload}
                  deleteFile={deleteFile}
                />
              ))
            : null}
        </div>
      </div>
    </Fragment>
  );
};

FileUpload.propTypes = {
  fileUpload: PropTypes.func.isRequired,
  fileDownload: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  fileList: PropTypes.func.isRequired,
  upfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  upfile: state.upfile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fileUpload, fileDownload, deleteFile, fileList }
)(FileUpload);
