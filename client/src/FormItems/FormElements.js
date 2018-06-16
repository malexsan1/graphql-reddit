import styled from 'styled-components'

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export const RowItem = styled.div`
  display: flex;
  flex: 1;
`

export const Label = styled.span`
  color: #555;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 3px;
`

export const ErrorText = Label.extend`
  color: firebrick;
  font-size: 12px;
  font-weight: 200;
  opacity: ${({ hasError }) => (hasError ? 1 : 0)};
`

export const FieldRoot = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`
