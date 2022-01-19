/*
  Checkbox Component
*/

import React, {ChangeEvent} from 'react';

// Import React Bootstrap Component
import FormCheck, {FormCheckType} from 'react-bootstrap/FormCheck';

// Import Utils
import {generateRandomString} from '../../../utils/functions';

type CheckboxProps = {
  type: undefined | FormCheckType,
  checked: boolean,
  id?: string,
  label?: string,
  className?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
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