const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({})
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }
