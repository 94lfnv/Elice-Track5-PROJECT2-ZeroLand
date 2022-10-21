import axios from "axios";

axios.defaults.timeout = 3000;
axios.defaults.headers["Content-Type"] = "application/json";
const backendPortNumber = import.meta.env.VITE_BACK_PORT_NUM;
const BASE_URL = `http://${window.location.hostname}:${backendPortNumber}/`;

axios.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
      throw new Error("(!) axios error");
    }
  );

// axios.interceptors.request.use(
//     (req) => {
//         console.log(req.headers, req.body);
//         // express로 보내는 데이터 타입이 "이미지 형태"일 경우, 
//         // "Content-Type = multipart/form-data";
//     },
//     (err) => {
//         console.log(err);
//     }
// )

const customAxios = axios.create({
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    }
  });

const post = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    // bodydata는 백엔에서 처리되기 전 데이터
    // console.log(bodyData);

    return customAxios.post(BASE_URL + endpoint, bodyData);
}

const get = async (endpoint, params="") => {
    return customAxios.get(BASE_URL + endpoint + "/" + params);
}

const put = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    return customAxios.put(BASE_URL + endpoint, bodyData);
}

const del = async (endpoint, data) => {
  const bodyData = JSON.stringify(data);
  return customAxios.delete(BASE_URL + endpoint, bodyData);
}

export { post, get, put, del as delete };
