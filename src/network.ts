import axios, { AxiosRequestConfig, Method } from "axios";
import { BASE_URL } from "./constants";

// Abort request if it takes longer than 30 seconds
const REQUEST_TIMEOUT = 30 * 1000;

interface RequestOptions {
  data?: any;
  customHeaders?: any;
  interpolate?: any;
  withCredentials?: boolean;
  meta?: any;
}

export const fetch = async (
  type: Method,
  path: string,
  options: RequestOptions = {}
): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.customHeaders || {}),
  };

  let config: AxiosRequestConfig = {
    url: path,
    baseURL: BASE_URL,
    headers,
    method: type,
    responseType: "json",
    timeout: REQUEST_TIMEOUT,
    withCredentials: options.withCredentials,
  };

  if (type !== "GET") {
    config = { ...config, data: options.data };
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
