import Header from './Header'

export const generated = () => {
  return <Header />
}

export default { title: 'Components/Header' }

export const mobile = () => {
  return (
    <div style={{ width: `350px` }}>
      <Header />
    </div>
  )
}
