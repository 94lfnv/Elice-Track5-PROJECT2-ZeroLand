import axios from "axios";

// axios.defaults.timeout = 3000;
const backendPortNumber = 5001;

const BASE_URL = `http://${window.location.hostname}:${backendPortNumber}/`;

export const userAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    timeout: 3000,
});

userAxios.interceptors.request.use(
    (req) => {
      return req;
    },
    (error) => {
      throw new Error(`This is error! ${error}`);
    }
  );
  
  userAxios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status >= 400 && error.response.status < 500) {
        console.log(error);
        return Promise.reject(error);
        // throw new Error(`This is request error!`);
      }
      if (error.response.status >= 500) {
        console.log(error);
        throw new Error("This is server error!");
      }
    }
  );

const post = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    // bodydata는 백엔에서 처리되기 전 데이터
    // console.log(bodyData);

    return axios.post(BASE_URL + endpoint, bodyData, {
        headers });
}

const get = async (endpoint, params="") => {
    return axios.get(BASE_URL + endpoint + "/" + params, {
        headers });
}

const put = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    console.log("token", `Bearer ${sessionStorage.getItem("userToken")}`);
    return axios.put(BASE_URL + endpoint, bodyData, {
        headers });
}

const del = async (endpoint, params="") => {
    // const bodyData = JSON.stringify(data);
    // console.log(bodyData);
    return axios.delete(BASE_URL + endpoint + "/" + params, {
        headers });
}

export { post, get, put, del as delete };