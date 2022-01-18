/*
  Checkbox Component
*/

import React from 'react';

// Import React Bootstrap Component
import FormCheck from 'react-bootstrap/FormCheck';

// Import Utils
import { generateRandomString } from '../../../utils/functions';

type CheckboxProps = {
  type: any,
  checked: boolean,
  id?: string,
  label?: string,
  className?: string,
  onChange: any,
}

const Checkbox = ({
  id = generateRandomString(),
  checked,
  type,
  label,
  className = '',
  onChange,
  }: CheckboxProps) => (
    <FormCheck
      id={id}
      checked={checked}
      type={type}
      className={className}
      label={label}
      onChange={onChange}
    />
)

export default Checkbox;