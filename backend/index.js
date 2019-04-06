const express = require('express')
const server = express()

const port = process.env.PORT || 9000
require('dotenv').config()

server.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello!' })
})

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))
