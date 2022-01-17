/*
  Avatar Component
*/

import React, { useEffect, useState } from 'react';

// Import React Bootstrap Component
import Image from 'react-bootstrap/Image';

// Import Avatar
import avatar from '../../assets/avatar.png';

// Import Utils
import {getAuthToken} from "../../utils/functions";

type AvatarProps = {
  id: string,
  accountId: string,
}

const Avatar = ({ id, accountId }: AvatarProps) => {
  const [imageSrc, setImageSrc] = useState(null);

  // useEffect(() => {
  //   const { access_token } = getAuthToken() || {};
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${access_token}`,
  //       'Content-Type': 'application/json'
  //     },
  //   };
  //
  //   fetch(`https://api-im.chatdaddy.tech/contacts/${accountId}/${id}/image`, requestOptions)
  //     .then(async response => {
  //       const isJson = response.headers.get('content-type')?.includes('application/json');
  //       const data = isJson && await  response.json();
  //
  //       //check for error response
  //       if(!response.ok) {
  //         // get error message from body or default to response status
  //         const error = (data && data.message) || response.status;
  //         return Promise.reject(error);
  //       }
  //       const { url } = data || {}
  //       setImageSrc(url)
  //     }).catch(error => {
  //     console.error('There was an Error: ', error);
  //   });
  // }, [id, accountId])

  return  <Image roundedCircle={true} src={imageSrc || avatar} height="70" width="70"/>
}

export default Avatar;