import * as React from 'react';

export default ({ items, label, changeFunction, selectedItem }) => {
  return (
    <form className="black-80">
      <div className="measure">
        <label htmlFor="name" className="f6 b db mb2">
          {label}
        </label>
        <select
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          onChange={e => changeFunction(e.target.value)}
          defaultValue={selectedItem}
        >
          {items.map(item => (
            <option key={item.positionId} value={item.positionId}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
