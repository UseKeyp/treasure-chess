import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Span } from 'src/components/Typography'
import Dropdown from 'src/components/Dropdown'
import FilterCheckbox from 'src/components/FilterCheckbox'
import UsernameSearchBar from 'src/components/UsernameSearchBar/UsernameSearchBar'

const getYearsArray = () => {
  var max = new Date().getFullYear()
  var min = max - 30
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}
// const daysArr = [...Array(31).keys()].map((i) => i + 1)

// const daysList = ['Any', ...daysArr]
const monthsList = [
  // 'Any',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const yearsList = getYearsArray()

const FilterItems = ({ onChange }) => {
  // const [day, setDay] = useState(daysList[0])
  const [month, setMonth] = useState(monthsList[new Date().getMonth()])
  const [year, setYear] = useState(yearsList[0])
  const [outcome, setOutcome] = useState('Any')
  const [username, setUsername] = useState('')

  const transparentWhite = 'rgba(255, 255, 255, 0.6)'
  const CategoryWrap = ({ children }) => (
    <Span fontSize={11} fontWeight="bold" color={transparentWhite}>
      <h4>{children}</h4>
    </Span>
  )

  useEffect(() => {
    onChange({
      // ...(day && { day }),
      ...(month && { month: monthsList.indexOf(month) + 1 }),
      ...(year && { year }),
      ...(outcome && { outcome: outcome.toLowerCase() }),
      ...(username && { username }),
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [month, year, username, outcome])

  return (
    <div className="filter-items w-full">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            category={<CategoryWrap>Month</CategoryWrap>}
            options={monthsList}
            queryFilterFunction={setMonth}
            queryFilter={month}
          />
          <Dropdown
            category={<CategoryWrap>Year</CategoryWrap>}
            options={yearsList}
            queryFilterFunction={setYear}
            queryFilter={year}
          />
        </div>
        <div className="filter-items__input-wrap">
          <h4
            fontSize={11}
            fontWeight="bold"
            color={transparentWhite}
            mt="1rem"
            className="mb-2"
          >
            Opponent
          </h4>
          <UsernameSearchBar initialQuery={username} setQuery={setUsername} />
        </div>
        <FilterCheckbox
          options={['Any', 'Won', 'Draw', 'Lost']}
          queryFilterFunction={setOutcome}
          queryFilter={outcome}
          category="Your Outcome"
        />
      </div>
    </div>
  )
}
FilterItems.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default FilterItems
