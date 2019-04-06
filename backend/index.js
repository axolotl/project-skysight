const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const axios = require('axios')
const server = express()

// configure vars
const port = process.env.PORT || 9000
require('dotenv').config()
const api_url = process.env.API_URL
const api_secret = process.env.API_SECRET

// use middleware
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

// serve requests
server.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello!' })
})

server.get('/stations', (req, res) => {
  axios
    .get(`${api_url}/stations`, {
      headers: { authorization: `Bearer ${api_secret}` }
    })
    .then(api_res => {
      console.log(api_res)
      res.status(200).json(api_res.data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'oops! something went wrong' })
    })
})

// listen for requests
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))
