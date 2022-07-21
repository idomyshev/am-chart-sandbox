import axios from "axios";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings";

const AXIOS_METHODS = {
  get: "get",
  post: "post",
  put: "put",
  patch: "patch",
  delete: "delete",
};

export const apiRequest = async (config) => {
  let method = AXIOS_METHODS.get;
  if (config.method) {
    method = config.method.toLowerCase();
    if (!AXIOS_METHODS[method]) {
      console.error("Axios method not found:", method);
    }
  }
  const apiHost = process.env.VUE_APP_API_HOST;
  const apiPath = process.env.VUE_APP_API_PATH
    ? process.env.VUE_APP_API_PATH
    : "";
  const url = `${apiHost}${apiPath}${config.path}`;
  const data = config.data || {};
  let headers = {};
  const bearerToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_FIELD);
  if (bearerToken) {
    headers = { Authorization: `Bearer ${bearerToken}` };
  }
  let configAxios;
  if (method === AXIOS_METHODS.get || method === AXIOS_METHODS.delete) {
    configAxios = { params: data, headers };
  } else {
    configAxios = { headers };
  }
  let res;
  try {
    if (method === AXIOS_METHODS.post) {
      res = await axios.post(url, data, configAxios);
    } else if (method === AXIOS_METHODS.put) {
      res = await axios.put(url, data, configAxios);
    } else if (method === AXIOS_METHODS.patch) {
      res = await axios.put(url, data, configAxios);
    } else if (method === AXIOS_METHODS.delete) {
      res = await axios.delete(url, configAxios);
    } else {
      res = await axios.get(url, configAxios);
    }
  } catch (e) {
    console.error("Axios error:", e);
  }
  return res?.data;
};
