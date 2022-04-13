const usernames = ['alice', 'bob', 'carl']

mockGraphQLQuery('usernames', (variables) => {
  return {
    usernames: usernames.filter((username) =>
      username.includes(variables.query)
    ),
  }
})
