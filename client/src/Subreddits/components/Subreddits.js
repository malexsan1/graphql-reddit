import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { subredditQueries } from '../gql'

const Subreddits = () => (
  <Query query={subredditQueries.GET_SUBREDDITS}>
    {({ data: { subreddits }, loading }) => {
      return loading ? (
        'Loading...'
      ) : (
        <Root>
          <Item to="/">home</Item>
          {subreddits.map(s => (
            <Item key={s.id} to={`/r/${s.name}`}>
              {s.name}
            </Item>
          ))}
        </Root>
      )
    }}
  </Query>
)

export default Subreddits

// #region styled components
const Item = styled(Link)`
  color: #333;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 300;
  text-decoration: none;
  text-transform: uppercase;

  &:not(:last-child):after {
    content: '-';
    margin: 5px;
  }
`

const Root = styled.div`
  align-items: center;
  background: #ddd;
  display: flex;
  justify-content: flex-start;
  height: 32px;
  padding: 0 10px;
`
// #endregion
