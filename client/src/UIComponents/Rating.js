import React from 'react'
import styled from 'styled-components'

const Rating = ({ rating, onIncrement, onDecrement }) => (
  <Root>
    <Button inc onClick={onIncrement}>
      &uarr;
    </Button>
    <Score>{rating}</Score>
    <Button onClick={onDecrement}>&darr;</Button>
  </Root>
)

export default Rating

// #region styled-components
const Button = styled.button`
  background: transparent;
  border: none;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: bolder;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ inc }) => (inc ? '#0b7f11' : '#ba181d')};
  }
`

const Score = styled.span`
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 2px 0;
`

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2px;
`
// #endregion
