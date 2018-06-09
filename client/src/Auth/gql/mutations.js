import gql from 'graphql-tag'

export const SIGN_UP_USER = gql`
  mutation signUpUser($input: SignUpInput) {
    signUpUser(input: $input) {
      id
      email
      token
    }
  }
`
