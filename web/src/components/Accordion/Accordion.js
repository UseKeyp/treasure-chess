const Accordion = ({ children, toggle }) => {
  return <div>{toggle && <div>{children}</div>}</div>
}

export default Accordion
