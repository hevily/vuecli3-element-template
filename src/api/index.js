import axios from 'axios';
import * as util from '../assets/util.js';

const baseURL = '/';

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type':'application/json'
  }
});

// 请求处理
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

//错误处理
instance.interceptors.response.use(function(response) {
  if(response.data.status!=200){
    return util.catchError({
      message: response.data.statusCode || `${response.config.url}请求失败`
    });
  }
  return response;
}, util.catchError);

export default instance;
