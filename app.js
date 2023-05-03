//express
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

//handlehars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// browser-sync start --proxy "localhost:3000" --files "./**/**/**"
app.use(express.static('public'))


app.use(routes)
app.listen(port, () =>{
  console.log('server on!')
})