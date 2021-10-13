import React, { FC, useCallback } from 'react';

import { OutlinedInput, OutlinedInputProps } from '@material-ui/core';

type CustomInputProps = {
  onChange(value: string): void;
};

type DefaultInputProps = Omit<OutlinedInputProps, 'onChange'> & CustomInputProps;

const DefaultInput: FC<DefaultInputProps> = ({ onChange, ...rest }) => {
  const handleValueChange = useCallback(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange],
  );

  return <OutlinedInput {...rest} onChange={handleValueChange} />;
};

export default DefaultInput;
