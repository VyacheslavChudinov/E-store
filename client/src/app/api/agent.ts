import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";
import { ShippingAddress } from "../models/order";

export interface LoginPayload {
  username: string;
  password: string;
}
export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}

export interface CreateOrderPayload {
  saveAddress: boolean;
  shippingAddress: ShippingAddress;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      await sleep();
    }

    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }

    return response;
  },
  async (error) => {
    const { data, status } = error.response as AxiosResponse;

    if (import.meta.env.DEV) {
      await sleep();
    }

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
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(getResponse),
  post: (url: string, body: object) => axios.post(url, body).then(getResponse),
  put: (url: string, body: object) => axios.put(url, body).then(getResponse),
  delete: (url: string) => axios.delete(url),
  postForm: (url: string, data: FormData) =>
    axios
      .postForm(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(getResponse),
  putForm: (url: string, data: FormData) =>
    axios
      .putForm(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(getResponse),
};

const mapToFormData = (data: object) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key as keyof typeof data]);
  }

  return formData;
};

const Admin = {
  createProduct: (product: object) =>
    requests.postForm("products", mapToFormData(product)),
  updateProduct: (product: object) =>
    requests.putForm("products", mapToFormData(product)),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
};

const Catalog = {
  getProducts: (params: URLSearchParams) => requests.get("/products", params),
  getProduct: (id: number) => requests.get(`/products/${id}`),
  getProductFilters: () => requests.get(`/products/filters`),
};

const Basket = {
  addItem: (productId: number, quantity: number = 1) =>
    requests.post(`/basket?productId=${productId}&quantity=${quantity}`, {}),
  remove: (productId: number, quantity: number = 1) =>
    requests.delete(`/basket?productId=${productId}&quantity=${quantity}`),
  get: () => requests.get("/basket"),
};

const Orders = {
  getOrders: () => requests.get("orders"),
  getOrder: (id: number) => requests.get(`orders/${id}`),
  createOrder: (orderPayload: CreateOrderPayload) =>
    requests.post(`orders`, orderPayload),
  getSavedAddress: () => requests.get("/orders/savedAddress"),
};

const Payments = {
  createPaymentIntent: () => requests.post(`payments`, {}),
};

const ApiErrors = {
  get400Error: () => requests.get("errors/bad-request"),
  get401Error: () => requests.get("errors/unathorized"),
  get404Error: () => requests.get("errors/not-found"),
  get500Error: () => requests.get("errors/server-error"),
  getValidationError: () => requests.get("errors/validation-error"),
};

const Account = {
  login: (userInfo: LoginPayload) => requests.post("/account/login", userInfo),
  register: (userInfo: RegisterPayload) =>
    requests.post("/account/register", userInfo),
  currentUser: () => requests.get("/account/currentUser"),
};

const agent = {
  Catalog,
  Basket,
  ApiErrors,
  Account,
  Orders,
  Payments,
  Admin,
};

export default agent;
