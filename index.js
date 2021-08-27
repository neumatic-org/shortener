const links = require('./db')

const { appURL, port } = require('./config')

function generate(l) {
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
  for (var i = 0; i < 5; i++)
    result += possible.charAt(Math.floor(Math.random() * possible.length));
    return result;
}

// express
const express = require('express');
const app = express();
require('ejs')
app.set('view engine', 'ejs');
//
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.text())
app.use(parser.urlencoded({
    extended: true
}));
//

app.use('/app', express.static('assets'))

//
app.post('/', async (req, res) => {
  let { path, url } = req.body
  if (!url) return res.status(400).json({ success: false, message: 'Malformed request.'})

  if (!/^[a-zA-Z0-9_.-]*$/.test(path)) return res.status(400).json({ success: false, message: 'Invalid path.'})
  if (!/https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi.test(url)) return res.status(400).json({ success: false, message: 'Invalid URL parsed from REGeX.' })
  if (path === '' || !path) path = generate(3)

 

  const exists = await links.findOne({ code: path })
  if (exists) return res.status(400).json({ success: false, message: "Url custom path already exists."})
  console.log(req.body)

  const linkExists = await links.findOne({ link: url })
  if (linkExists && path === '') path = linkExists.code


  if (path.length > 20) return res.status(400).json({ success: false, message: "Path is too long." })
  if (url.length > 200) return res.status(400).json({ success: false, message: "URL is too long." })

  const newURL = new links({
    code: path,
    link: url,
  })
  await newURL.save()

  res.redirect('/app/created?id='+path+'&s=1')
});

app.get('/app/config', async (req, res) => {
  let appUrl_friendly = appURL.replace('https://', '').replace('http://', '').replace('www.', '')

  res.set('Content-Type', 'application/octet-stream');
  res.set('Content-Disposition', 'attachment; filename="'+appUrl_friendly+'.sxcu"');

  res.send('{"Version":"13.5.0","DestinationType":"URLShortener","RequestMethod":"POST","RequestURL":"'+appURL+'/api/new","Body":"JSON","Data":"{\"url\":\"$input$\"}"}')
})
//
app.post('/api/new', async (req, res) => {
  console.log(req.body)
  let { path, url } = req.body
  if (!url) return res.status(400).json({ success: false, message: 'Malformed request.'})

  if (!/^[a-zA-Z0-9_.-]*$/.test(path)) return res.status(400).json({ success: false, message: 'Invalid path.'})

  if (path === '' || !path) path = generate(3)

 

  const exists = await links.findOne({ code: path })
  if (exists) return res.status(400).json({ success: false, message: "Url custom path already exists."})
  console.log(req.body)

  const linkExists = await links.findOne({ link: url })
  if (linkExists && path === '') path = linkExists.code


  if (path.length > 20) return res.status(400).json({ success: false, message: "Path is too long." })
  if (url.length > 200) return res.status(400).json({ success: false, message: "URL is too long." })

  const newURL = new links({
    code: path,
    link: url,
    clicks: 0,
  })
  await newURL.save()

  res.status(200).json({ success: true, url: appURL+'/'+path })
});
//
app.get('/', (req, res) => {
  res.redirect('/app')
});
app.get('/app', async (req, res) => {
  const db = await links.find()
  res.render('home.ejs', { db: db, req: req, appURL: appURL })
});
app.get('/app/created', async (req, res) => {
  const id = req.query.id
  const url = await links.findOne({ code: id })
  if (!url) return res.render('404.ejs', { id: id, appURL: appURL })

  if (!req.query.id) return res.json({ success: false, message: 'Invalid id'})
  res.render('created.ejs', { id: req.query.id, appURL: appURL })
});

app.get('/:id?', async (req, res) => {
  const url = await links.findOne({ code: req.params.id })
  if (!url) return res.render('404.ejs', { id: req.params.id, appURL: appURL })
  res.render('link.ejs', { link: url.link })

  url.clicks = url.clicks + 1
  await url.save()

  //res.send(url.link)
});



// /(https?:\/\/(?:[[:alnum:]]+\.)?[[:alnum:]]+\.com)(\/\S*)/g.test(str)

app.listen(80, () => {
  console.log('ready');
});

//

function generate(l) {
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
for (var i = 0; i < 5; i++)
  result += possible.charAt(Math.floor(Math.random() * possible.length));
  return result;
}