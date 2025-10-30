import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888", // EC2의 ip주소:포트 넣어줘야 함
  withCredentials: true,
});

export default api;
