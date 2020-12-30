import React from 'react';

const Inventory = ({items}) => {
  const showInventory = (items) => {
    return(
      <div>
        <h4 className='ml-3 title'>INVENTORY</h4>
        <ul className=''>
          {items.map((item, index) => (
            <li
              className=''
              key={index}>
              {item.attributes.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return(
    <div>
      {showInventory(items)}
    </div>
  );

}

export default Inventory;