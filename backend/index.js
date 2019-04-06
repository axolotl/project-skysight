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
server.disable('etag')

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
server.get('/stations', async (req, res) => {
  try {
    const stations = await get_stations()

    res.status(200).json(stations.data)
  } catch (err) {
    res.status(500).json({ error: 'oops! something went wrong' })
  }
})

// get detailed info for one station
server.get('/stations/:id', async (req, res) => {
  const { id } = req.params

  try {
    const station = await get_station(id)

    res.status(200).json(station.data)
  } catch (err) {
    res.status(500).json({ error: 'oops! something went wrong' })
  }
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
