/*
    Loader Component
*/

import React from 'react';

type LoaderProps = {
  width?: string,
  height?: string,
  className?: string,
  title? : any,
}

const Loader = ({ title, className = '' }: LoaderProps) => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      <div className="w-100 text-center">
        <div className="sbl-circ-dual text-center"/>
        {title && (
          <p>{title}</p>
        )}
      </div>
    </div>
  )
}

export default Loader;