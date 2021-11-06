import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { H3, Span, P } from 'src/components/Typography'
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

const FilterItems = ({ headline, onChange }) => {
  // const [day, setDay] = useState(daysList[0])
  const [month, setMonth] = useState(monthsList[new Date().getMonth()])
  const [year, setYear] = useState(yearsList[0])
  const [outcome, setOutcome] = useState('Any')
  const [username, setUsername] = useState('')

  const transparentWhite = 'rgba(255, 255, 255, 0.6)'
  const CategoryWrap = ({ children }) => (
    <Span fontSize={11} fontWeight="bold" color={transparentWhite}>
      {children}
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
    <div className="filter-items">
      <H3 ml="1rem" mb="0.5rem">
        {headline}
      </H3>
      <div className="filter-items__time-wrap">
        {/*    <div style={{ flex: 1, flexBasis: 75, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Day</CategoryWrap>}
            options={daysList}
            queryFilterFunction={setDay}
            queryFilter={day}
          />
        </div> */}
        <div style={{ flex: 1, flexBasis: 105, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Month</CategoryWrap>}
            options={monthsList}
            queryFilterFunction={setMonth}
            queryFilter={month}
          />
        </div>
        <div style={{ flex: 1, flexBasis: 75, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Year</CategoryWrap>}
            options={yearsList}
            queryFilterFunction={setYear}
            queryFilter={year}
          />
        </div>
      </div>
      <div className="filter-items__input-wrap">
        <P fontSize={11} fontWeight="bold" color={transparentWhite} mb="0.5rem">
          Opponent
        </P>
        <UsernameSearchBar initialQuery={username} setQuery={setUsername} />
      </div>
      <div className="filter-items__outcome-wrap">
        <P fontSize={11} fontWeight="bold" color={transparentWhite} ml="1rem">
          Your outcome
        </P>
        <FilterCheckbox
          options={['Any', 'Won', 'Draw', 'Lost']}
          queryFilterFunction={setOutcome}
          queryFilter={outcome}
        />
      </div>
    </div>
  )
}
FilterItems.propTypes = {
  headline: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FilterItems
