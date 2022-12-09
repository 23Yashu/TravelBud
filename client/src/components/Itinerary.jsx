import React from 'react';

const Itinerary = ({info, place, dist, stops, start, end, days}) => {
    return (
        <div className="info-wrapper card p-4 bg-dark">
            {place ?
                <h3 className='border-bottom mb-4'>Great! So You have decided a trip of <span className='text-warning'>{dist}</span> kms to <span className='text-warning'>{info.length}</span> places in <span className='text-success'>{place}</span> for <span className='text-warning'>{days}</span> Days!</h3>:
                <h3 className='border-bottom mb-4'>Ohk! So You have decided a trip of <span className='text-warning'>{dist}</span> kms to <span className='text-warning'>{info.length}</span> places nearby for <span className='text-warning'>{days}</span> Days!</h3>
            }
            <h4 className='mb-3'>Here is your Itinerary...</h4>
            <div className="d-flex">
                <ul className='list-group list-group-numbered col-10'>
                {info.map((item,index)=>{
                    return <li key={index} className="card bg-white p-2 list-group-item mb-2">{item.address}</li>
                })}
                </ul>
                <ul className='list-group col-2 text-right'>
                <li className="card bg-white p-2 list-group-item mb-2">0 kms</li>
                {stops.legs.map((item,index)=>{
                    return <li key={index} className="card bg-white p-2 list-group-item mb-2">{item.distance.value/1000} kms</li>
                })}
                </ul>
            </div>
            <h3 className='text-center mt-4'>Happy Journey!😘</h3>
        </div>
    );
}
 
export default Itinerary;