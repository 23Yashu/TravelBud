import React from 'react';
import DownloadPdf from './DownloadPdf';

const Itinerary = ({info, place, dist, stops, start, end, days, temp}) => {
    const weather = {
        0: "Clear Sky 🌞",
        1: "Cloudy ☁️",
        2: "Gloomy ⛅️",
        3: "Clear Sky",
        4: "Mist 🌫",
        5: "Drizzle 🌦",
        6: "Rain ⛈",
        7: "Snow ❄️",
        8: "Passing showers 🌧",
        9: "Thunderstorm 🌩"
    }
    return (
        <div className="info-wrapper card p-4 bg-dark">
            {place ?
                <h3 className='border-bottom mb-4'>Great! So You have decided a trip of <span className='text-warning'>{dist}</span> kms to <span className='text-warning'>{info.length}</span> places in <span className='text-success'>{place}</span> for <span className='text-warning'>{days}</span> Days! <span className='itemp'> {temp[0]}°C - {weather[temp[1]]}</span></h3>:
                <h3 className='border-bottom mb-4'>Ohk! So You have decided a trip of <span className='text-warning'>{dist}</span> kms to <span className='text-warning'>{info.length}</span> places nearby for <span className='text-warning'>{days}</span> Days! <span className='itemp'> {temp[0]}°C - {weather[temp[1]]}</span></h3>
            }
            <h4 className='mb-3'>Here is your Itinerary from <span className='text-warning'>{start}</span> to <span className='text-warning'>{end}</span>...<DownloadPdf rooElementId="downloadThis" downloadFileName="travelbud-itinerary" /></h4>
            
            <div className="d-flex" id="downloadThis">
                <ul className='list-group list-group-numbered col-9 col-sm-10'>
                {info.map((item,index)=>{
                    return <li key={index} className="card bg-white p-2 list-group-item mb-2">{item.address}</li>
                })}
                </ul>
                <ul className='list-group col-3 col-sm-2 text-right'>
                <li className="card bg-white p-2 list-group-item mb-2">0 kms</li>
                {stops.legs.map((item,index)=>{
                    return <li key={index} className="card bg-white p-2 list-group-item mb-2">{item.distance.value/1000} kms</li>
                })}
                </ul>
            </div>
            <h3 className='text-center mt-4'>Happy Journey!<span role="img" aria-label="emoji">😘</span></h3>
        </div>
    );
}
 
export default Itinerary;