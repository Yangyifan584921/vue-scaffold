import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const { code, data, message } = response.data
  if(!code) {
    return Promise.resolve({
      code,
      data
    })
  } else {
    message ? ElMessage.error(message) : '服务端未知错误'
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance