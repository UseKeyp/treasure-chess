export const USER_LOCALE_MUTATION = gql`
  mutation userLocale($locale: String!) {
    userLocale(locale: $locale) {
      id
      locale
    }
  }
`
