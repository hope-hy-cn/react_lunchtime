const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app =express()

const order = require('./order')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(order)

app.listen(4444, () => {
  console.log('Mock server is running on PORT 444')
})