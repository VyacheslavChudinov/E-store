import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

const getResponseData = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

const requests = {
  get: (url: string) => axios.get(url).then(getResponseData),
  post: (url: string, body: object) =>
    axios.post(url, body).then(getResponseData),
  put: (url: string, body: object) =>
    axios.put(url, body).then(getResponseData),
  delete: (url: string) => axios.delete(url).then(getResponseData),
};

const Catalog = {
  getProducts: () => requests.get("/products"),
  getProduct: (id: number) => requests.get(`/products/${id}`),
};

const ApiErrors = {
  get400Error: () => requests.get("errors/bad-request").catch(console.log),
  get401Error: () => requests.get("errors/unathorized").catch(console.log),
  get404Error: () => requests.get("errors/not-found").catch(console.log),
  get500Error: () => requests.get("errors/server-error").catch(console.log),
  getValidationError: () =>
    requests.get("errors/validation-error").catch(console.log),
};

const agent = {
  Catalog,
  ApiErrors,
};

export default agent;
