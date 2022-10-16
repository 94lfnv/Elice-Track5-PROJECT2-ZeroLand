import axios from "axios";

axios.defaults.timeout = 3000;
const backendPortNumber = 5001;

const BASE_URL = `http://${window.location.hostname}:${backendPortNumber}/`;


const post = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    // bodydata는 백엔에서 처리되기 전 데이터
    // console.log(bodyData);

    return axios.post(BASE_URL + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

const get = async (endpoint, params="") => {
    return axios.get(BASE_URL + endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

const put = async (endpoint, data) => {
    const bodyData = JSON.stringify(data);
    console.log("token", `Bearer ${sessionStorage.getItem("userToken")}`);
    return axios.put(BASE_URL + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

const del = async (endpoint, params="") => {
    // const bodyData = JSON.stringify(data);
    // console.log(bodyData);
    return axios.delete(BASE_URL + endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

export { post, get, put, del as delete };