import React from 'react';

const Header = () => {
    return (
      <header className='header py-4 mb-5'>
        <div className='container d-flex align-items-center'>
          <h1 className='fw-bold col-12 col-sm-6'>
            <a href="/">
              <span className='text-success'>Travel</span>
              <span className='text-warning'>Bud</span>
            </a>
            <span className="text-white fs-6 d-block">Your best buddy to plan your vacations!</span>
          </h1>
        </div>
      </header>
    );
  };
  
  export default Header;