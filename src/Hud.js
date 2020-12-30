import React from 'react';

const Hud = ({score, health}) => {

  return(
    <div className='title navbar mt-3'>
      <div className='row col-12 d-flex justify-content-center'>
        <h1>
          DARKEST DUNGEON
        </h1>
      </div>
      <div className='row col-12'>
        <div className='col-4'>
          <h3>
            HEALTH - ♥♥♥♥♥♥♥♥♥
          </h3>
        </div>
        <div className='col-4'></div>        
        <div className='col-4 text-right'>
          <h3>
            SCORE - 00000
          </h3>
        </div>
      </div>
    </div>
  ); 
}

export default Hud;