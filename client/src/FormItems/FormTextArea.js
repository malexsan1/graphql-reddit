import React from 'react'
import styled from 'styled-components'

const FormTextArea = ({ input, label, meta: { error, touched } }) => (
  <Root>
    <Label>{label}</Label>
    <Input {...input} placeholder={label} />
    <ErrorText hasError={error && touched}>{error}</ErrorText>
  </Root>
)

export default FormTextArea

// #region styled-components
const Input = styled.textarea`
  align-self: stretch;
  border: 1px solid #ddd;
  font-size: 12px;
  padding: 3px;

  &:focus {
    outline: none;
    border-color: #c6dcff;
  }
`

const Label = styled.span`
  color: #555;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 3px;
`

const ErrorText = Label.extend`
  color: firebrick;
  font-size: 12px;
  font-weight: 200;
  opacity: ${({ hasError }) => (hasError ? 1 : 0)};
`

const Root = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`
// #endregion
