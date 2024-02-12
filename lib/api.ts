import axios from "axios";

const $axios = axios.create({
  headers: {
    baseUrl: "/api",
    "Content-Type": "application/json",
  },
});

export default $axios;
