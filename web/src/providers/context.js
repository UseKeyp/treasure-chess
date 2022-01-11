const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({}) // debug is set because it's used in custom functions
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }
