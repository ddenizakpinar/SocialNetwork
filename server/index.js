const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
const PORT = process.env.PORT || 5000
const http = require("http");

const server = http.createServer(app);


// Middleware   
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Enable Cors
app.options('*', cors());
app.use(cors());

// Import Routes
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');

dotenv.config()

const mongoURI = "mongodb+srv://daimon11:ccogitoergo@server-md8pm.mongodb.net/test?retryWrites=true&w=majority";

// Connect to DB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to db!')
);

const conn = mongoose.createConnection(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true });


// Init gfs
let gfs;

conn.once('open', () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// @desc Loads form
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

// Display img
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


// Socket
const socketApi = require('./socketApi');
const io = socketApi.io;

io.attach(server)



// Route Middlewares
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/chat',chatRouter);

app.use(express.static(__dirname + '/client'));
server.listen(PORT, () => console.log('Up and running...'))