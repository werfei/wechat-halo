import Taro from '@tarojs/taro'
import interceptors from './interceptors'
import cons from "../../config/cons";

interceptors.forEach(i => Taro.addInterceptor(i))

function getBaseUrl() {
  let BASE_URL
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    BASE_URL = 'https://blog.werfei.com'
  } else {
    // 生产环境
    BASE_URL = cons.apiUrl
  }
  return BASE_URL
}

const http = {
  baseOptions: function (params, method = "GET") {
    const {url, data} = params
    const BASE_URL = getBaseUrl(url)
    let contentType = "application/json"
    contentType = params.contentType || contentType
    const option = {
      url: BASE_URL + url,
      data: data || "",
      method: method,
      header: {
        'content-type': contentType,
        'API-Authorization': cons.apiToken
      }
    }
    return Taro.request(option)
  },

  get: function (url, data) {
    const option = {url, data}
    return this.baseOptions(option)
  },

  post: function (url, data, contentType) {
    const params = {url, data, contentType}
    return this.baseOptions(params, "POST")
  },

  put: function (url, data) {
    const option = {url, data}
    return this.baseOptions(option, "PUT")
  },

  delete: function (url, data) {
    const option = {url, data}
    return this.baseOptions(option, "DELETE")
  }
}
export default http
