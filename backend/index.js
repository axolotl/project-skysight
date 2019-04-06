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
const auth_header_object = {
  headers: { authorization: `Bearer ${api_secret}` }
}

// use middleware
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

// request handlers (return promises)
const get_stations = () => axios.get(`${api_url}/stations`, auth_header_object)

const get_station = id =>
  axios.get(`${api_url}/stations/${id}`, auth_header_object)

// serve requests

// test that server is live
server.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello!' })
})

// get basic info for all stations
server.get('/stations', (req, res) => {
  get_stations
    .then(api_res => {
      res.status(200).json(api_res.data)
    })
    .catch(err => {
      res.status(500).json({ error: 'oops! something went wrong' })
    })
})

// get detailed info for one station
server.get('/stations/:id', (req, res) => {
  const { id } = req.params

  get_station(id)
    .then(api_res => {
      res.status(200).json(api_res.data)
    })
    .catch(err => {
      res.status(500).json({ error: 'oops! something went wrong' })
    })
})

// get detailed info for all statsions
server.get('/stations-with-details', async (req, res) => {
  try {
    const stations = await get_stations()

    const stations_with_detail = await Promise.all(
      stations.data.map(station => {
        return get_station(station.Station)
          .then(detail => ({ ...station, detail: detail.data }))
          .catch(err => ({ ...station, detail: false }))
      })
    )

    res.status(200).json(stations_with_detail)
  } catch (err) {
    res.status(500).json({ error: 'oops! something went wrong' })
  }
})

// listen for requests
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))
