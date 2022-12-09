import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { differenceInDays } from 'date-fns'
import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Calendar = (props) => {

    const startDate = new Date();
    const endDate = new Date();
    const [diffInDays, setDiffInDays] = useState(0);

    const handleSelect=(ranges) =>{
        const diff = differenceInDays(ranges.selection.endDate, ranges.selection.startDate);
        setDiffInDays(diff);
    }
    useEffect(() => {
        props.start(diffInDays);
        props.end(diffInDays);
        props.days(diffInDays);
     }, [diffInDays]);
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }
    return (<div className='calendarHolder text-center'>
        <h3 className='bg-dark p-2'>Select your dates 🌴</h3>
        <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5B61"]} onChange={handleSelect} />
    </div>)
}

export default Calendar