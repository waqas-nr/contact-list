/*
  Button Component
*/

import React from 'react';

// Import React Bootstrap Component
import Button from 'react-bootstrap/Button';

// Unique Id generator
import { v4 as uuidv4 } from 'uuid';

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
  id = uuidv4.toString(),
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