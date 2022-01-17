/*
  Tags Component
*/

import React from 'react';

// Import React Bootstrap Component
import Badge from 'react-bootstrap/Badge';

type TagsProps = {
  pill?: boolean,
  bg?: string,
  className?: string,
  textColor?: any,
  children: any,
}

const Tags = ({ pill = false, textColor = 'light', bg = 'primary', className = '', children }: TagsProps) => (
  <Badge className={className} text={textColor} bg={bg} pill={pill}>{children}</Badge>
)

export default Tags;