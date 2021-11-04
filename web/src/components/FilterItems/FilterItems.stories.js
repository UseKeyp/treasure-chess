import FilterItems from './FilterItems'

const handleChange = (data) => {
  // eslint-disable-next-line no-console
  console.log({ data })
}

export const generated = () => {
  return (
    <div style={{ width: 330 }}>
      <FilterItems headline="Filter Games" onChange={handleChange} />
    </div>
  )
}

export default { title: 'Components/FilterItems' }
