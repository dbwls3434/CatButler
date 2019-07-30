const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Filepost = require('../../models/Filepost');

const aws = require('aws-sdk');
aws.config.region = 'ap-northeast-2';
aws.config.update({
  signatureVersion: 'v4'
});
const AWS_ACCESS_KEY_ID = config.get('awsAccessKeyId');
const AWS_SECRET_ACCESS_KEY = config.get('awsSecretAccessKey');
const S3_BUCKET = config.get('s3Bucket');

/* 파일 업로드 : /api/upfile/fileupload */
router.post(
  '/fileupload',
  auth,
  [
    (check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('content', 'Content is required')
      .not()
      .isEmpty())
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Fill the all inputs' });
    }
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    try {
      const file = req.files.file;

      const { title, content } = req.body;
      const fileName = file.name;
      const filePath = Date.now() + '-' + fileName;

      const s3 = new aws.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        Bucket: S3_BUCKET
      });

      s3.createBucket(() => {
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: filePath,
          Body: file.data
        };

        s3.upload(s3Params, (err, data) => {
          if (err) {
            console.error(err.message);
            return res.status(400).json({ msg: 'File Upload Error' });
          }
        });
      });

      const upFilePath = `https://${S3_BUCKET}.s3.${
        aws.config.region
      }.amazonaws.com/${filePath}`;

      const filepost = new Filepost({
        user: req.user.id,
        title,
        content,
        fileName,
        filePath,
        upFilePath
      });

      await filepost.save();

      res.json({
        _id: filepost._id,
        user: req.user.id,
        title,
        content,
        fileName,
        filePath,
        upFilePath
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/* 파일 다운드 : /api/upfile/filedownload/:filepath */
router.get('/filedownload/:filepath', async (req, res) => {
  const filePath = req.params.filepath;

  try {
    const s3 = new aws.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      Bucket: S3_BUCKET
    });

    s3.createBucket(() => {
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: filePath
      };

      s3.getObject(s3Params, (err, data) => {
        if (err) {
          console.error(err.message);
          return res.status(400).json({ msg: 'File Download Error' });
        }

        res.setHeader(
          'Content-disposition',
          'attachment; filename=' + filePath
        );
        res.setHeader('Content-length', data.ContentLength);
        res.end(data.Body);
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/* 파일 삭제 : /api/upfile/delete/:id */
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const filepost = await Filepost.findById(req.params.id);
    const filePath = filepost.filePath;

    if (!filepost)
      return res.status(400).json({ msg: 'The Filepost is not found' });

    if (filepost.user && req.user && filepost.user._id == req.user.id) {
      const s3 = new aws.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        Bucket: S3_BUCKET
      });

      s3.createBucket(() => {
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: filePath
        };

        s3.deleteObject(s3Params, (err, data) => {
          if (err) {
            console.error('errmsg==>' + err.message);
            return res.status(400).json({ msg: 'File Deleting Error' });
          }
        });

        filepost.remove();

        res.json({ msg: 'The Filepost removed' });
      });
    } else {
      console.log('else');
      res.status(400).json({ msg: 'The owner only can remove it' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/* 파일 리스트 가져오기 : /api/upfile/list */
router.get('/list', async (req, res) => {
  try {
    const list = await Filepost.find().sort({ date: -1 });

    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
