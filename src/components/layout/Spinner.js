import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <section className='spinner'>
        <div className='spinner-item'>
          <i className='fas fa-spinner fa-pulse fa-5x' />
        </div>
      </section>
    </Fragment>
  );
};

export default Spinner;
