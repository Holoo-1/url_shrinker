const express = require('express');
const app = express();
const URL = require('./models/db.js');
const { default: mongoose } = require('mongoose');
const cors = require('cors');


// Database Connect
const mongoURI = "mongodb://localhost:27017/urls";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Body Parser Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]

};

// Apply CORS options to all routes
app.use(cors(corsOptions));

app.set('view engine', 'ejs');

app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get('host')}`;
  next();
});


const generateShortID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 6;
  let shortID = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortID += characters.charAt(randomIndex);
  }
  return shortID;
};


// Create Short URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { longURL } = req.body;
    let existingUrl = await URL.findOne({ longURL });

    if (existingUrl) {
      return res.status(200).json({
        ...existingUrl._doc,
        shortURL: `${req.baseUrl}/${existingUrl.shortID}`
      });
    }

    let newUrl = await URL.create({
      longURL,
      shortID: generateShortID(),
    });

    res.status(200).json({
      ...newUrl._doc,
      shortID: newUrl.shortID,
      shortURL: `${req.baseUrl}/${newUrl.shortID}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      msg: 'Server Error',
    });
  }
});


// Clicks on ShortURLs
app.get('/:shortID', async (req, res) => {
  try {
    const { shortID } = req.params;
    let url = await URL.findOne({ shortID });
    if (!url) {
      return res.status(404).json({
        msg: 'No valid URLs found.',
      });
    }
    await url.save();
    res.redirect(url.longURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
