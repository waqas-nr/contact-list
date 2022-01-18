/*
  Button Component
*/

import React from 'react';

// Import React Bootstrap Component
import Button from 'react-bootstrap/Button';

// Import Utils
import { generateRandomString } from '../../../utils/functions';

type BootstrapButtonProps = {
  disabled?: boolean,
  type: any,
  onClick?: any,
  size?: any,
  id?: string,
  bg?: string,
  title: any,
  className?: string,
}

const BootstrapButton = ({
  id = generateRandomString(),
  type,
  title,
  size = 'lg',
  bg = 'primary',
  className = '',
  disabled = false,
  onClick = (event: any) => {event.preventDefault();}
}: BootstrapButtonProps) => (
  <Button
    id={id}
    type={type}
    variant={bg}
    size={size}
    disabled={disabled}
    className={className}
    onClick={onClick}
  >
    {title}
  </Button>
)

export default BootstrapButton;