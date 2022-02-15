export const OAUTH_CODE_GRANT_MUTATION = gql`
  query oauthCodeGrant($type: String!, $state: String!, $code: String!) {
    oauthCodeGrant(type: $type, state: $state, code: $code)
    Boolean
  }
`
