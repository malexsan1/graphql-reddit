import React from 'react'
import { Mutation } from 'react-apollo'
import { withHandlers } from 'recompose'
import { Form, Field } from 'react-final-form'

import { subredditMutations } from '../gql'
import {
  FormButtons,
  FormTextArea,
  FormElements,
  FormContainer,
} from '../../FormItems'
const { Row, RowItem } = FormElements

const CreateSubreddit = ({ addSubreddit, history }) => (
  <Mutation mutation={subredditMutations.ADD_SUBREDDIT}>
    {mutateFn => (
      <Form
        onSubmit={addSubreddit(mutateFn)}
        render={({ handleSubmit }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Row>
              <RowItem>
                <Field name="name">
                  {formField => (
                    <FormTextArea {...formField} label="Subreddit name" />
                  )}
                </Field>
              </RowItem>
            </Row>
            <FormButtons reset={history.goBack} />
          </FormContainer>
        )}
      />
    )}
  </Mutation>
)

export default withHandlers({
  addSubreddit: ({ history }) => fn => input => {
    fn({ variables: { input } })
    history.goBack()
  },
})(CreateSubreddit)
