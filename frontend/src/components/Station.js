import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

class Station extends Component {
  render() {
    const { data } = this.props

    return (
      <Container>
        <Container>
          <p>{data.Station}</p>
          <p>
            {data.City}, {data.State}
          </p>
          <p>
            Last updated: {moment(data.detail.meta.timestamp).format('LLLL')}
          </p>
        </Container>
      </Container>
    )
  }
}

const Container = styled.div`
  outline: 1px solid red;
`

export default Station
