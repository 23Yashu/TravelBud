import React from 'react';

const Header = () => {
    return (
      <header className='header py-4 mb-5'>
        <div className='container d-flex align-items-center'>
          <h1 className='fw-bold col-6'>
            <span className='text-success'>Travel</span>
            <span className='text-warning'>Bud</span>
            <span className="text-white fs-6 d-block">Your best buddy to plan your vacations!</span>
          </h1>
          <h5 className='tagline text-white fs-4 text-right col-6'>Work hard<span role="img" aria-label="emoji">💪🏻</span>, Travel harder!<span role="img" aria-label="emoji">🚗</span></h5>
        </div>
      </header>
    );
  };
  
  export default Header;