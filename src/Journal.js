import React from 'react';

const Journal = ({history}) => {
  const showAdventureLog = (log) => {
    return(
      <div>
        <h4 className='ml-3 title'>JOURNAL</h4>
        <ul className=''>
          {log.map((item, index) => (
            <li
              className=''
              key={index}>
              {item}
            </li>
          ))}
        </ul>        
      </div>
    );
  }

  return(
    <div>
      {showAdventureLog(history)}
    </div>
  );
}

export default Journal;