import React from 'react';

const Header = () => {
    return (
      <header className='header py-4 position-absolute top-0 satrt-0'>
        <div className='container'>
          <h1 className='fw-bold'>
            <span className='text-primary'>Travel</span>
            <span className='text-danger'>Bud</span>
          </h1>
        </div>
      </header>
    );
  };
  
  export default Header;