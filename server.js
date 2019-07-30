const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false })); // body-parser 사용할 수 있도록 함
app.use(cors()); // cors 허용
app.use(fileUpload());

app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/board', require('./routes/api/board'));
app.use('/api/upfile', require('./routes/api/upfile'));
app.use(express.static('uploads'));

// Heroku 배포를 위한 설정
// if (process.env.NODE_ENV == 'production') {
//   app.use(express.static('build_pro'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build_pro', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
      requestCert: false,
      rejectUnauthorized: false
    },
    app
  )
  .listen(PORT, () => console.log(`Server started on port ${PORT}`));
