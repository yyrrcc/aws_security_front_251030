import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8888",
  baseURL: "http://15.165.98.233", // EC2의 ip주소 넣어줘야 함
});

export default api;
