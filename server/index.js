const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.get('/api/userReviews/:id', (req, res) => {
  let courseId = req.params.id;
  axios
    .get(`http://18.117.233.198:3007/api/userReviews/${courseId}`)
    .then((data) => res.send(data.data))
    .catch((err) => res.send(err));
});

app.get('/api/totalReviewScore/:id', (req, res) => {
  let courseId = req.params.id;
  axios
    .get(`http://18.117.233.198:3007/api/totalReviewScore/${courseId}`)
    .then((data) => res.send(data.data))
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
