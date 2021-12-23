const MintingContext = React.createContext()
import { useLazyQuery } from '@apollo/client'

import { CHECKOUT, MINTING, _SUCCESS } from 'src/providers/minting/constants'

const MINT_CHECKOUT_URL = gql`
  query mintCheckoutUrl(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintCheckoutUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`
const MintingContextProvider = ({ children }) => {
  const [state, setState] = React.useState({ mintingStatus: null })

  const { mintingStatus } = state

  const [mintCheckoutUrl, { error: mintCheckoutError }] = useLazyQuery(
    MINT_CHECKOUT_URL,
    {
      onCompleted: ({ mintCheckoutUrl }) => {
        if (mintCheckoutUrl.includes('https')) {
          setMintingContext({ ...mintingContext, mintingStatus: CHECKOUT })
          window.open(
            mintCheckoutUrl,
            'Treasure Chess Checkout',
            'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
          )
        } else {
          setGamesContext({ ...mintingContext, mintingStatus: MINTING })
        }
      },
    }
  )

  const mint = async () => {
    // Check balance and mintCredits
    // If necessary trigger Wyre deposit prompt
    // Execute mint
    // Start polling
  }

  return (
    <MintingContext.Provider
      value={{
        mint,
        mintingStatus,
      }}
    >
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = React.useContext(MintingContext)

export { MintingProvider, useMinting }
