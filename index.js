var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: 'uploads/' }); // Stores files in 'uploads' directory

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    name:file.originalname,
    type:file.mimetype,
    size:file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
