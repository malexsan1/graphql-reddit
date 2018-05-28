import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { compose, withHandlers, setDisplayName } from 'recompose'

import { postsMutations, postsQueries } from '../gql'

import {
  FormButtons,
  FormElements,
  FormTextArea,
  FormTextInput,
  FormContainer,
} from '../../FormItems'
const { Row, RowItem } = FormElements

const PostAdder = ({ addPost }) => (
  <Mutation
    mutation={postsMutations.ADD_POST}
    update={(cache, { data: { addPost: updateData } }) => {
      const { posts } = cache.readQuery({ query: postsQueries.GET_POSTS })
      cache.writeQuery({
        query: postsQueries.GET_POSTS,
        data: { posts: [...posts, updateData] },
      })
    }}
  >
    {mutateFn => (
      <Form
        onSubmit={addPost(mutateFn)}
        validate={({ title, url }) => {
          const urlRegex = new RegExp(
            /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
          )
          const errors = {}
          if (!title) {
            errors.title = 'Required'
          }
          if (!!url && !urlRegex.test(url)) {
            errors.url = 'Invalid url'
          }
          return errors
        }}
        render={({ handleSubmit, form: { reset } }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Row>
              <RowItem>
                <Field name="title">
                  {formField => <FormTextInput {...formField} label="Title" />}
                </Field>
              </RowItem>
            </Row>
            <Row>
              <RowItem>
                <Field name="description">
                  {formField => (
                    <FormTextArea {...formField} label="Description" />
                  )}
                </Field>
              </RowItem>
            </Row>
            <Row>
              <RowItem>
                <Field name="url">
                  {formField => <FormTextInput {...formField} label="URL" />}
                </Field>
              </RowItem>
            </Row>
            <FormButtons reset={reset} />
          </FormContainer>
        )}
      />
    )}
  </Mutation>
)

export default compose(
  setDisplayName('PostAdder'),
  withHandlers({
    addPost: () => addFn => (input, { reset }) => {
      addFn({
        variables: {
          input,
        },
      })
      reset()
    },
  }),
)(PostAdder)
