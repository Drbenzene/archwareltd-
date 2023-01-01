import React, { useEffect, useState } from 'react'
import { addDays } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

function DateInput({ setEndDate, setStartDate }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const changeHandler = (item) => {
    setState([item.selection])
    setStartDate(item.selection.startDate)
    setEndDate(item.selection.endDate)
  }

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={changeHandler}
        ranges={state}
        moveRangeOnFirstSelection={false}
      />
    </div>
  )
}

export default DateInput
