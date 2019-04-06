import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

// Cloud cover (especially if its broken or overcast)
// Wind Speed and Direction (direction is degrees relative to north like a weather vane)
// Visibility (if it's lower than 5 miles)
// Temperature

class Station extends Component {
  render() {
    const { data } = this.props

    return (
      <Container>
        <p>{data.Station}</p>
        <p>
          {data.City}, {data.State}
        </p>
        <p>Last updated: {moment(data.detail.meta.timestamp).format('LLLL')}</p>
      </Container>
    )
  }
}

const Container = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px;
  p {
    font-size: 1.8rem;
  }
`

export default Station
