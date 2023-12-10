import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5000/api/";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          throw Object.values(data.errors).flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const getResponse = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(getResponse),
  post: (url: string, body: object) => axios.post(url, body).then(getResponse),
  put: (url: string, body: object) => axios.put(url, body).then(getResponse),
  delete: (url: string) => axios.delete(url).then(getResponse),
};

const Catalog = {
  getProducts: () => requests.get("/products"),
  getProduct: (id: number) => requests.get(`/products/${id}`),
};

const ApiErrors = {
  get400Error: () => requests.get("errors/bad-request"),
  get401Error: () => requests.get("errors/unathorized"),
  get404Error: () => requests.get("errors/not-found"),
  get500Error: () => requests.get("errors/server-error"),
  getValidationError: () => requests.get("errors/validation-error"),
};

const agent = {
  Catalog,
  ApiErrors,
};

export default agent;
