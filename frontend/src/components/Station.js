import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'

// Cloud cover (especially if its broken or overcast)
// Wind Speed and Direction (direction is degrees relative to north like a weather vane)
// Visibility (if it's lower than 5 miles)
// Temperature

const serverUrl = process.env.REACT_APP_SERVER

class Station extends Component {
  state = { error: false, detail: false }

  componentDidMount() {
    this.getStationData()
    this.interval = setInterval(() => this.getStationData(), 1000 * 60 * 5)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getStationData = () => {
    const { Station } = this.props.data

    axios
      .get(`${serverUrl}/stations/${Station}`)
      .then(res => {
        this.setState({ detail: res.data })
      })
      .catch(err => this.setState({ error: true }))
  }

  render() {
    const { data, scalingFactor } = this.props
    const { detail } = this.state

    return (
      // scaling factor scales the size of everything to the size of the screen
      // this is useful because we want our components to scale to take up a
      // consistent percentage of an arbitrarily large screen

      <Container scalingFactor={scalingFactor}>
        <Header scalingFactor={scalingFactor}>
          {data.Station} - {data.City}, {data.State}
        </Header>

        {detail && (
          <>
            <UpdatedAt scalingFactor={scalingFactor}>
              <b>Last updated:</b>{' '}
              {moment(detail.meta.timestamp).format('LLLL')}
            </UpdatedAt>

            <Detail scalingFactor={scalingFactor}>
              <b>Clouds:</b>{' '}
              {detail.clouds.length ? (
                <List>
                  {detail.clouds.map((type, i) => (
                    <ListItem key={i} scalingFactor={scalingFactor}>
                      {type.repr}
                    </ListItem>
                  ))}
                </List>
              ) : (
                'skies are clear!'
              )}
            </Detail>

            <Detail scalingFactor={scalingFactor}>
              <b>Wind:</b> {detail.wind_speed.repr} knots{' '}
              {detail.wind_direction.repr} degrees
            </Detail>
            <Detail scalingFactor={scalingFactor}>
              <b>Visibility:</b> {detail.visibility.repr} SM
            </Detail>
            <Detail scalingFactor={scalingFactor}>
              <b>Temperature:</b> {detail.visibility.repr} C
            </Detail>
          </>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  flex: 1;
  margin: ${({ scalingFactor }) => `${2 * scalingFactor}rem`};
  padding: ${({ scalingFactor }) => `${2 * scalingFactor}rem`};

  > * {
    margin-bottom: ${({ scalingFactor }) => `${1.5 * scalingFactor}rem`};
  }
`

const Header = styled.h2`
  font-size: ${({ scalingFactor }) => `${2.4 * scalingFactor}rem`};
`

const UpdatedAt = styled.h4`
  font-size: ${({ scalingFactor }) => `${1.6 * scalingFactor}rem`};
`

const Detail = styled.div`
  font-size: ${({ scalingFactor }) => `${1.8 * scalingFactor}rem`};

  b {
    font-weight: bold;
  }
`

const List = styled.ul`
  display: inline-flex;
`

const ListItem = styled.li`
  font-size: ${({ scalingFactor }) => `${1.8 * scalingFactor}rem`};
  margin-right: ${({ scalingFactor }) => `${0.5 * scalingFactor}rem`};
`

export default Station
