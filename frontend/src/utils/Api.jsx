import axios from "axios";

axios.defaults.timeout = 3000;
const backendPortNumber = 5001;
const BASE_URL = `http://${window.location.hostname}:${backendPortNumber}/`;


axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
      throw new Error("(!) axios error");
    }
  );

const post = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    // bodydata는 백엔에서 처리되기 전 데이터
    // console.log(bodyData);

    return axios.post(BASE_URL + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        } });
}

const get = async (endpoint, params="") => {
    return axios.get(BASE_URL + endpoint + "/" + params, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        } });
}

const put = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    return axios.put(BASE_URL + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        } });
}

const del = async (endpoint, params="") => {
    // const bodyData = JSON.stringify(data);
    // console.log(bodyData);
    return axios.delete(BASE_URL + endpoint + "/" + params, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        } });
}

export { post, get, put, del as delete };

// export const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     timeout: 3000,
// });

// api.interceptors.request.use(
//     (req) => {
//       return req;
//     },
//     (error) => {
//       throw new Error(`This is error! ${error}`);
//     }
//   );
  
//  api.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     (error) => {
//       if (error.response.status >= 400 && error.response.status < 500) {
//         console.log(error);
//         return Promise.reject(error);
//         // throw new Error(`This is request error!`);
//       }
//       if (error.response.status >= 500) {
//         console.log(error);
//         throw new Error("This is server error!");
//       }
//     }
//   );