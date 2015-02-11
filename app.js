var express = require('express')
var app = express()

var isUrl = require('is-url')
var normalizeUrl = require('normalize-url')
var scrutinize = require('scrutinize')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  next()
})

app.get('/', function(req, res) {
  var url = normalizeUrl(req.param('url') || '')
  res.type('application/json')

  if (isUrl(url)) {
    scrutinize(url, {}, function(data) {
      res.send(JSON.stringify(data))
    })
  } else {
    res.status(406)
    res.send(JSON.stringify({
      error: 'No valid url specified',
      example: 'http://api.scrutinize.io?url=example.com'
    }))
  }
})

app.listen(process.env.PORT || 3030) // Deltron
