import React, { FC, useCallback } from 'react';

import { OutlinedInput, OutlinedInputProps } from '@mui/material';

type CustomInputProps = {
  onChange(value: string): void;
};

type DefaultInputProps = Omit<OutlinedInputProps, 'onChange'> & CustomInputProps;

const DefaultInput: FC<DefaultInputProps> = ({ onChange, ...rest }) => {
  const handleValueChange: OutlinedInputProps['onChange'] = useCallback(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange],
  );

  return <OutlinedInput {...rest} onChange={handleValueChange} />;
};

export default DefaultInput;
