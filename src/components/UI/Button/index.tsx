/*
  Button Component
*/

import React, {ReactElement} from 'react';

// Import React Bootstrap Component
import Button from 'react-bootstrap/Button';

// Import Utils
import {generateRandomString} from '../../../utils/functions';

type BootstrapButtonProps = {
  disabled?: boolean,
  type: 'button' | 'submit' | 'reset' | undefined,
  onClick?: any,
  size?: any,
  id?: string,
  bg?: string,
  title: string | Element | ReactElement,
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
  onClick = (event: Event) => {event.preventDefault();}
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