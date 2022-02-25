const MetaTagContext = React.createContext({})

const APP_DOMAIN = process.env.APP_DOMAIN

const initialState = {
  title: 'Treasure',
  description: 'Treasure Chess NFT',
  ogUrl: APP_DOMAIN,
}

const MetaTagProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState)

  const updateTags = (data) => {
    setState({
      title: data.title,
      description: `${data.winner} Wins Via ${data.termination}!`,
      ogUrl: `${APP_DOMAIN}/treasures/${data.tokenId}`,
      ogContentUrl: data.gifUrl,
    })
  }

  return (
    <MetaTagContext.Provider
      value={{
        tags: state,
        updateTags,
      }}
    >
      {children}
    </MetaTagContext.Provider>
  )
}

const useMetaTags = () => React.useContext(MetaTagContext)

export { MetaTagProvider, useMetaTags }
