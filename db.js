const mongoose = require('mongoose');

const { mongoConnectionStr } = require('./config')

mongoose.connect(mongoConnectionStr, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const linkSchema = new mongoose.Schema({
  link: String,
  code: String,
  clicks: { type: Number, default: 0 },
});

const links = mongoose.model('shortener', linkSchema);


module.exports = links;