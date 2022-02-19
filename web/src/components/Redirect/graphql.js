export const OAUTH_CODE_GRANT_MUTATION = gql`
  mutation codeGrant($type: String!, $state: String!, $code: String!) {
    codeGrant(type: $type, state: $state, code: $code) {
      action
      text
      status
    }
  }
`
