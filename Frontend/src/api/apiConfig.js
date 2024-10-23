import axios from "axios";

const axiosApiFetch = axios.create({
  baseURL: "https://e-commerce-mern-ehqa.onrender.com/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosApiFetch;
