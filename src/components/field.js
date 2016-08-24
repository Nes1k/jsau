import React from 'react';

export default ({value, X, Y}) => {
  return (
    <div className="col-sm-4">
      {value ? value : '\u00a0'}
    </div>
  );
}
