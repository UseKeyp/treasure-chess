export const OAUTH_URL_QUERY = gql`
  query oAuthUrlQuery($type: String!) {
    oAuthUrl(type: $type) {
      url
      type
      text
    }
  }
`
