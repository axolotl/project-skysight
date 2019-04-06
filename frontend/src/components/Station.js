import React, { Component } from 'react'
import styled from 'styled-components'

class Station extends Component {
  render() {
    const { data } = this.props

    return (
      <Container>
        <Container>
          <p>{data.Station}</p>
        </Container>
      </Container>
    )
  }
}

const Container = styled.div`
  outline: 1px solid red;
`

export default Station
