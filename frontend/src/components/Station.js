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
        <Header>
          {data.Station} - {data.City}, {data.State}
        </Header>

        <UpdatedAt>
          <b>Last updated:</b>{' '}
          {moment(data.detail.meta.timestamp).format('LLLL')}
        </UpdatedAt>

        <Detail>
          <b>Clouds:</b>{' '}
          {data.detail.clouds.length ? (
            <List>
              {data.detail.clouds.map(type => (
                <ListItem>{type.repr}</ListItem>
              ))}
            </List>
          ) : (
            'skies are clear!'
          )}
        </Detail>

        <Detail>
          <b>Wind:</b> {data.detail.wind_speed.repr} knots{' '}
          {data.detail.wind_direction.repr} degrees
        </Detail>
        <Detail>
          <b>Visibility:</b> {data.detail.visibility.repr} SM
        </Detail>
        <Detail>
          <b>Temperature:</b> {data.detail.visibility.repr} C
        </Detail>
      </Container>
    )
  }
}

const Container = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px;

  > * {
    margin-bottom: 15px;
  }
`

const Header = styled.h2`
  font-size: 2.4rem;
`

const UpdatedAt = styled.h4`
  font-size: 1.6rem;
`

const Detail = styled.div`
  font-size: 1.8rem;

  b {
    font-weight: bold;
  }
`

const List = styled.ul`
  display: inline-flex;
`

const ListItem = styled.li`
  margin-right: 0.5rem;
`

export default Station
