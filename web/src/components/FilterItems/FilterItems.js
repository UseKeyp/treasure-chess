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

const initialDates = {
  day: daysList[0],
  month: monthsList[0],
  year: yearsList[0],
}

const FilterItems = ({ headline, onChange }) => {
  const [datesToFilter, setDatesToFilter] = useState(initialDates)
  const [outcome, setOutcome] = useState('Any')
  const [inputValue, setInputValue] = useState('')

  const transparentWhite = 'rgba(255, 255, 255, 0.6)'
  const CategoryWrap = ({ children }) => (
    <Span fontSize={11} fontWeight="bold" color={transparentWhite}>
      {children}
    </Span>
  )

  const handleQueryFilter = ({ type, text }) => {
    setDatesToFilter({ ...datesToFilter, [type]: text })
  }
  const handleOutcomeFilter = (text) => {
    setOutcome(text)
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    const queryData = {
      dates: datesToFilter,
      outcome,
      opponent: inputValue,
    }
    onChange(queryData)
  }, [datesToFilter, inputValue, outcome, onChange])

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
            queryFilterFunction={(text) =>
              handleQueryFilter({ type: DAY, text })
            }
            queryFilter={datesToFilter.day}
          />
        </div>
        <div style={{ flex: 1, flexBasis: 105, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Month</CategoryWrap>}
            options={monthsList}
            queryFilterFunction={(text) =>
              handleQueryFilter({ type: MONTH, text })
            }
            queryFilter={datesToFilter.month}
          />
        </div>
        <div style={{ flex: 1, flexBasis: 75, margin: 4 }} className="flex">
          <Dropdown
            category={<CategoryWrap>Year</CategoryWrap>}
            options={yearsList}
            queryFilterFunction={(text) =>
              handleQueryFilter({ type: YEAR, text })
            }
            queryFilter={datesToFilter.year}
          />
        </div>
      </div>
      <div className="filter-items__input-wrap">
        <P fontSize={11} fontWeight="bold" color={transparentWhite} mb="0.5rem">
          Opponent
        </P>
        <input
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="username"
        />
      </div>
      <div className="filter-items__outcome-wrap">
        <P fontSize={11} fontWeight="bold" color={transparentWhite} ml="1rem">
          Your outcome
        </P>
        <FilterCheckbox
          options={['Any', 'Won', 'Draw', 'Lost']}
          queryFilterFunction={handleOutcomeFilter}
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
