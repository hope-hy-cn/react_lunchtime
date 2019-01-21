const express = require('express')
const bodyParser = require('body-parser')

const app =express()

const orderList = require('./order/list')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(orderList)

app.listen(4444, () => {
  console.log('Mock server is running on PORT 444')
})