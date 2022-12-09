import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { differenceInDays } from 'date-fns'
import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Calendar = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [diffInDays, setDiffInDays] = useState(0);
    const [dateSelect, setDateSelect] = useState(false);

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    const handleSelect=(ranges) =>{
        const diff = differenceInDays(ranges.selection.endDate, ranges.selection.startDate);
        setDiffInDays(diff);
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        setDateSelect(true);
    }
    useEffect(() => {
        let sDate = `${startDate.getDate()} ${getMonthName(+startDate.getMonth())}`;
        let eDate = `${endDate.getDate()} ${getMonthName(+endDate.getMonth())}`;
        props.start(sDate);
        props.end(eDate);
        props.days(diffInDays);
        props.flag(dateSelect);
     }, [diffInDays]);
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }
    return (<div className='calendarHolder text-center'>
        <h3 className='bg-dark p-2'>Select your dates <span role="img" aria-label="emoji">🌴</span></h3>
        <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5B61"]} onChange={handleSelect} />
        {dateSelect && <h4 className='mt-4'>Dates selected from {`${startDate.getDate()} ${getMonthName(+startDate.getMonth())}`} to {`${endDate.getDate()} ${getMonthName(+endDate.getMonth())}`}</h4>}
    </div>)
}

export default Calendar