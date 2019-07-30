import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FileListItem = ({ fileone, fileDownload, deleteFile, auth }) => {
  return (
    <div className='file-list-item' key={fileone._id}>
      <h3>{fileone.title}</h3>
      <p>{fileone.content}</p>
      <p>
        <a onClick={e => fileDownload(fileone.filePath)}>
          <img className='file-list-item-img' src={`${fileone.upFilePath}`} />
        </a>
      </p>
      <p>
        {auth && auth.user && auth.user._id === fileone.user && (
          <button
            className='btn btn-primary'
            onClick={e => deleteFile(fileone._id)}
          >
            delete
          </button>
        )}
      </p>
    </div>
  );
};

FileListItem.propTypes = {
  fileone: PropTypes.object.isRequired,
  fileDownload: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FileListItem);
