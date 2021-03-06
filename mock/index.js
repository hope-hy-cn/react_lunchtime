const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app =express()

const jobDiary = require('./jobDiary')
const Finance = require('./Finance')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(jobDiary)
app.use(Finance)

app.listen(4444, () => {
  console.log('Mock server is running on PORT 444')
})