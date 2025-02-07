import axios from "axios";
import store from "../store/store";
import router from "../router";

// You can use your own logic to set your local or production domain
const baseDomain = process.env.VUE_APP_ROOT_API;
console.log("url",process.env.VUE_APP_ROOT_API);
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;


const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
    },
});

http.defaults.headers.common = {
    "Content-Type": "application/json"
  }

http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
      if (error.request.status == 401)
       router.push("Login");
      
    return Promise.reject(error);
  });

http.interceptors.request.use(function (config) {
    const token = store.state.token;
    config.headers.Authorization = `Bearer ${token}`
    return config
}, function (erro) {
    return Promise.reject(erro)
})

export default http
