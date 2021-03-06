/*
  Input Component
*/

import React, {ChangeEvent} from 'react';

// Import React Bootstrap Component
import FormControl from 'react-bootstrap/FormControl';

type InputProps = {
  id: string,
  type?: string,
  placeholder: string,
  value: string,
  className?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({id, type = 'text', placeholder, value, className = '', onChange}: InputProps) => {
  return <FormControl
    id={id}
    type={type}
    placeholder={placeholder}
    className={className}
    value={value}
    onChange={onChange}
  />
}

export default Input;