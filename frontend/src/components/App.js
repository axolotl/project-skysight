import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Station from './Station'
import sampleData from '../sample_data'

// netlify bulid is not seeing env vars so hardcoding the deployed backend url for now
const serverUrl =
  process.env.REACT_APP_SERVER ||
  'https://project-skysight-backend.herokuapp.com/'

// function for chucking statinos into rows to approximate a square
const chuckIntoRows = (array, size) => {
  const chunkedArr = []
  let index = 0
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index))
    index += size
  }
  return chunkedArr
}

class App extends Component {
  state = {
    error: false,
    stations: [],
    scalingFactor: 1 // scaling factor is used to scale the size of the text and margins
  }

  // componentDidMount and componentWillUnmount are written with arrow syntax
  // in order to pass `this` to the event listener
  componentDidMount = () => {
    this.calculateScalingFactor()
    this.getStations()
    window.addEventListener('resize', this.calculateScalingFactor)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.calculateScalingFactor)
  }

  calculateScalingFactor = () => {
    this.setState({ scalingFactor: window.innerWidth / 1200 })
  }

  getStations = () => {
    axios
      .get(`${serverUrl}stations`)
      .then(res => {
        this.setState({ stations: res.data })
      })
      .catch(err => this.setState({ error: true }))
  }

  render() {
    const { error, stations, scalingFactor } = this.state

    // depending on how many stations there are, display data in as
    // close to a square as possible
    const numColumns = Math.ceil(Math.sqrt(stations.length))

    const chuckedStations = chuckIntoRows(stations, numColumns)

    if (error) {
      return (
        <Container>
          <Loading scalingFactor={scalingFactor}>
            oops! error loading data
          </Loading>
        </Container>
      )
    } else if (stations.length === 0) {
      return (
        <Container>
          <Loading scalingFactor={scalingFactor}>Loading ...</Loading>
        </Container>
      )
    } else {
      return (
        <Container>
          {chuckedStations.map((row, i) => (
            <Row key={i}>
              {row.map((station, i) => (
                <Station key={i} data={station} scalingFactor={scalingFactor} />
              ))}
            </Row>
          ))}
        </Container>
      )
    }
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

const Loading = styled.h1`
  font-size: ${({ scalingFactor }) => `${2.4 * scalingFactor}rem`};
`

export default App
