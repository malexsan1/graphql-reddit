import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { compose, withHandlers, setDisplayName } from 'recompose'

import { postsMutations, postsQueries } from '../gql'
import { subredditQueries } from '../../Subreddits/gql'

import {
  FormButtons,
  FormElements,
  FormTextArea,
  FormTextInput,
  FormContainer,
} from '../../FormItems'
const { Row, RowItem, Label, ErrorText, FieldRoot } = FormElements

const PostAdder = ({ addPost }) => (
  <Mutation
    mutation={postsMutations.ADD_POST}
    update={(cache, { data: { addPost: updateData } }) => {
      const { posts } = cache.readQuery({
        query: postsQueries.GET_POSTS,
        variables: { subreddit: undefined },
      })
      cache.writeQuery({
        query: postsQueries.GET_POSTS,
        data: { posts: [...posts, updateData] },
        variables: { subreddit: undefined },
      })
    }}
  >
    {mutateFn => (
      <Form
        onSubmit={addPost(mutateFn)}
        validate={({ title, subreddit, url }) => {
          const urlRegex = new RegExp(
            /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
          )
          const errors = {}
          if (!title) {
            errors.title = 'Required'
          }
          if (!subreddit) {
            errors.subreddit = 'Required'
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
            <Row>
              <RowItem>
                <Field name="subreddit">
                  {formField => <SubredditPicker {...formField} />}
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

const SubredditPicker = ({
  meta: { error, touched },
  input: { onChange, value },
}) => (
  <Query query={subredditQueries.GET_SUBREDDITS}>
    {({ data: { subreddits = [] } }) => {
      return (
        <FieldRoot>
          <Label>Subreddit</Label>
          <select onChange={onChange} value={value}>
            {value === '' && <option value="" />}
            {subreddits.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <ErrorText hasError={error && touched}>{error}</ErrorText>
        </FieldRoot>
      )
    }}
  </Query>
)

export default compose(
  setDisplayName('PostAdder'),
  withHandlers({
    addPost: ({ history }) => addFn => input => {
      addFn({
        variables: {
          input,
        },
      })
      history.goBack()
    },
  }),
)(PostAdder)
