import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'

import { commentsMutations, commentsQueries } from '../gql'
import { FormTextArea, FormElements, FormContainer } from '../../FormItems'
const { Row, RowItem } = FormElements

const CommentAdder = ({ postId, parentId }) => (
  <Mutation
    mutation={commentsMutations.ADD_COMMENT}
    update={(cache, { data: { addComment } }) => {
      const { comments } = cache.readQuery({
        query: commentsQueries.GET_COMMENTS,
        variables: { postId },
      })
      cache.writeQuery({
        query: commentsQueries.GET_COMMENTS,
        variables: { postId },
        data: {
          comments: [...comments, addComment],
        },
      })
    }}
  >
    {mutateFn => (
      <Form
        onSubmit={({ comment: content }, { reset }) => {
          mutateFn({ variables: { postId, parentId, content } })
          reset()
        }}
        validate={({ comment }) => {
          const errors = {}
          if (!comment) {
            errors.comment = 'Required'
          }
          return errors
        }}
        render={({ handleSubmit }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Row>
              <RowItem>
                <Field name="comment">
                  {formField => <FormTextArea label="Comment" {...formField} />}
                </Field>
              </RowItem>
            </Row>
            <AddButton type="submit">Add comment</AddButton>
          </FormContainer>
        )}
      />
    )}
  </Mutation>
)

// #region styled-components
const AddButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 2px;
  color: #444;
  height: 28px;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  padding: 0 5px;

  &:hover {
    background-color: #ccc;
  }
`
// #endregion

export default CommentAdder
