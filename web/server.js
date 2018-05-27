var express = require('express')

var app = express()

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
 
app.get('/', function (req, res) {
  res.render('./index.html')
})
 
app.listen(port, function () {
    console.log('Server Running')
})