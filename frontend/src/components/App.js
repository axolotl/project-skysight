import React, { Component } from 'react'
import styled from 'styled-components'

import Station from './Station'
import sampleData from '../sample_data'

class App extends Component {
  state = {
    stations: sampleData
  }

  render() {
    console.log(this.state.stations)

    const { stations } = this.state

    return (
      <Container>
        {stations.map((station, i) => (
          <Station key={i} data={station} />
        ))}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default App
