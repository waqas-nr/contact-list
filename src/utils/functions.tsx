// Import Lodash
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

import {AUTH_TOKEN} from './contants';

interface keyable {
  [key: string]: any
}

export const setAuthToken = (token: object) =>
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));

export const getAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    return JSON.parse(token);
  }
  return null;
}

export const checkAuthToken = () => !getAuthToken();

export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN)

export const generateRandomString = () => Math.random().toString(36).slice(2);

export const stringifyQuery = (data: keyable) => {
  if (!isEmpty(data)) {
    return map(keys(data), key => `${key}=${encodeURI(data[key])}`).join('&');
  }
  return '';
}

export const parsedQuery = (query: string) => {
  if (query) {
    const q = query.includes('?') ? query.substring(1) : query;
    const pairs = q.split('&')
    const result: keyable = {};
    forEach(pairs, (pair: string) => {
      const [first, second] = pair.split('=');
      result[first] = decodeURIComponent(second || '');
    });
    return JSON.parse(JSON.stringify(result));
  }
  return {};
}