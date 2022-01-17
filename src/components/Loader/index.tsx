/*
    Loader Component
*/

import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

type LoaderProps = {
  width?: string
  height?: string
  className?: string
  title? : any,
}

const Loader = ({ width = '100', height = '100', title, className = '' }: LoaderProps) => {
  return (
    <>
      <div className={`d-flex align-items-center ${className}`}>
        <div className="w-100 loader">
          <BallTriangle
            height={height}
            width={width}
            color="grey"
            arialLabel="loading-indicator"
          />
          {title && (
            <>{title}</>
          )}
        </div>
      </div>
    </>
  )
}

export default Loader;