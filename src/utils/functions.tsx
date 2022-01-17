import queryString from 'query-string';

import { AUTH_TOKEN } from './contants';

export const setAuthToken = (token: object) => {
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
}

export const getAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    return JSON.parse(token);
  }
  return null;
}

export const checkAuthToken = () => {
  return !getAuthToken();
}

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN)
}

export const parsedQuery = (query: string) => queryString.parse(query);

export const stringifyQuery = (data: any) => queryString.stringify(data);