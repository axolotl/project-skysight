import React, { Component } from 'react'
import styled from 'styled-components'

import Station from './Station'
import sampleData from '../sample_data'

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
    stations: sampleData
  }

  render() {
    const { stations } = this.state

    // depending on how many stations there are, display data in as
    // close to a square as possible
    const numColumns = Math.ceil(Math.sqrt(stations.length))

    const chuckedStations = chuckIntoRows(stations, numColumns)

    return (
      <Container>
        {chuckedStations.map((row, i) => (
          <Row key={i}>
            {row.map((station, i) => (
              <Station key={i} data={station} />
            ))}
          </Row>
        ))}
      </Container>
    )
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

export default App
