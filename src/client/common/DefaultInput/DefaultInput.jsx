import React, { useCallback } from 'react';
import { OutlinedInput } from '@material-ui/core';
import PropTypes from 'prop-types';

const DefaultInput = ({ onChange, ...rest }) => {
  const handleValueChange = useCallback(({ target: { value } }) => {
    onChange(value);
  }, []);

  return <OutlinedInput {...rest} onChange={handleValueChange} />;
};

DefaultInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DefaultInput;
