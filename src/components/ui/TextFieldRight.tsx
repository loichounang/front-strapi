import React  from 'react';

import {TextField} from '@mui/material';

const TextFieldRight = (props : any) => {
    return(<TextField {...props} inputProps={{style: { textAlign: 'right' }}} /> );
  }

export default TextFieldRight;