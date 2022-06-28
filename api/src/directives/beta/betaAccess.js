import { createValidatorDirective } from '@redwoodjs/graphql-server'
import { betaAccess as applicationRequireBetaAccess } from 'src/lib/auth'

export const schema = gql`
  """
  Use @betaAccess to restrict certain queries to members in the beta program
  """
  directive @betaAccess on FIELD_DEFINITION
`

const validate = () => {
  applicationRequireBetaAccess()
}

const betaAccess = createValidatorDirective(schema, validate)

export default betaAccess
