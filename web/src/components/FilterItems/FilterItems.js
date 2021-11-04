import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { H3, Span, P } from 'src/components/Typography'
import Dropdown from 'src/components/Dropdown'
import FilterCheckbox from 'src/components/FilterCheckbox'

const DAY = 'day'
const MONTH = 'month'
const YEAR = 'year'

const getYearsArray = () => {
  var max = new Date().getFullYear()
  var min = max - 30
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}
const daysArr = [...Array(31).keys()].map((i) => i + 1)

const daysList = ['Any', ...daysArr]
const monthsList = [
  'Any',
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
  const [day, setDay] = useState(daysList[0])
  const [month, setMonth] = useState(monthsList[0])
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
    const queryData = {
      ...(day && { day }),
      ...(month && { month }),
      ...(year && { year }),
      ...(outcome && { outcome }),
      ...(username && { username }),
    }
    onChange(queryData)
  }, [day, month, year, username, outcome, onChange])

  return (
    <div className="filter-items">
      <H3 ml="1rem" mb="0.5rem">
        {headline}
      </H3>
      <div className="filter-items__time-wrap">
        <div style={{ flex: 1, flexBasis: 75, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Day</CategoryWrap>}
            options={daysList}
            queryFilterFunction={setDay}
            queryFilter={day}
          />
        </div>
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
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          value={username}
          placeholder="username"
        />
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
