import axios from "axios";

const axiosApiFetch = axios.create({
  baseURL: "https://e-commerce-mern-zqx9.onrender.com/api/",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosApiFetch;
