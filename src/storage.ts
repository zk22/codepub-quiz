import Cookies, { CookieSetOptions } from "universal-cookie";
/*
Some browsers (e.g. iOS Safari in private mode) do not support localStorage or sessionStorage
But you still can set a (session) cookie.
*/
const STORAGE_NAMESPACE = "";
let isLocalStorageSupported = false;
if ("localStorage" in global) {
  try {
    global.localStorage.setItem(`${STORAGE_NAMESPACE}test`, "1");
    global.localStorage.removeItem(`${STORAGE_NAMESPACE}test`);
    isLocalStorageSupported = true;
  } catch (e) {
    isLocalStorageSupported = false;
  }
}

const getItem = (key: string): any => {
  try {
    if (isLocalStorageSupported) {
      return JSON.parse(
        global.localStorage.getItem(`${STORAGE_NAMESPACE}${key}`) as string
      );
    }
    const cookies = new Cookies();
    return JSON.parse(cookies.get(key));
  } catch (e) {
    return null;
  }
};

const setItem = (key: string, value: any): void => {
  if (isLocalStorageSupported) {
    global.localStorage.setItem(
      `${STORAGE_NAMESPACE}${key}`,
      JSON.stringify(value)
    );
  } else {
    const cookies = new Cookies();
    cookies.set(key, JSON.stringify(value));
  }
};

const removeItem = (key: string): void => {
  if (isLocalStorageSupported) {
    global.localStorage.removeItem(`${STORAGE_NAMESPACE}${key}`);
  } else {
    const cookies = new Cookies();
    cookies.remove(key);
  }
};

const deleteCookie = (key: string, expirationTime: string): void => {
  document.cookie = key.concat("=;path=/;expires=").concat(expirationTime);
};

const deleteMarketingCookie = (
  key: string,
  expirationTime: string,
  domain: string
): void => {
  document.cookie = key
    .concat(`=; domain=.${domain}; path=/;expires=`)
    .concat(expirationTime);
};

const setCookie = (
  key: string,
  value: any,
  cookie?: string,
  options?: CookieSetOptions
): void => {
  const cookies = cookie ? new Cookies(cookie) : new Cookies();
  return cookies.set(key, value, options);
};

const getCookie = (key: string, cookie?: string): any => {
  try {
    const cookies = cookie ? new Cookies(cookie) : new Cookies();
    return cookies.get(key);
  } catch (e) {
    return null;
  }
};

const getCookies = () => {
  try {
    return document ? document.cookie : null;
  } catch (e) {
    return null;
  }
};

export {
  getItem,
  setItem,
  removeItem,
  deleteCookie,
  deleteMarketingCookie,
  getCookie,
  getCookies,
  setCookie,
};
