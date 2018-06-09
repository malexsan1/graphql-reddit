import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Form, Field } from 'react-final-form'

import { authMutations } from '../gql'
import { FormElements, FormButtons, FormTextInput } from '../../FormItems'
const { Row, RowItem } = FormElements

const SignUp = ({ history }) => (
  <Root>
    <Mutation
      mutation={authMutations.SIGN_UP_USER}
      update={(_, { data: { signUpUser } }) => {
        localStorage.setItem('token', signUpUser.token)
        history.push('/')
      }}
    >
      {mutateFn => {
        return (
          <Form
            onSubmit={input => {
              mutateFn({ variables: { input } })
            }}
            render={({ handleSubmit, form: { reset } }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Row>
                  <RowItem>
                    <Field name="email">
                      {formField => (
                        <FormTextInput {...formField} label="Email" />
                      )}
                    </Field>
                  </RowItem>
                </Row>
                <Row>
                  <RowItem>
                    <Field name="password">
                      {formField => (
                        <FormTextInput
                          {...formField}
                          label="Password"
                          type="password"
                        />
                      )}
                    </Field>
                  </RowItem>
                </Row>
                <Row>
                  <RowItem>
                    <Field name="confirmPassword">
                      {formField => (
                        <FormTextInput
                          {...formField}
                          label="Confirm password"
                          type="password"
                        />
                      )}
                    </Field>
                  </RowItem>
                </Row>
                <FormButtons reset={reset} />
              </StyledForm>
            )}
          />
        )
      }}
    </Mutation>
  </Root>
)

export default withRouter(SignUp)

// #region styled components
const Root = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const StyledForm = styled.form`
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 5px;
`
// #endregion
