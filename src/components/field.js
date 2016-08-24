import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/board';

const Field = ({value, X, Y, select, ...props}) => {
  return (
    <div onClick={() => value ? null : select({X, Y})} className="col-sm-4">
      {value ? value : '\u00a0'}
    </div>
  );
};


export default connect(null, actions)(Field);
