import FilterItems from './FilterItems'

const handleChange = (data) => {
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
