import axios from 'axios'
axios.defaults.headers['Content-Type'] = "application/json; charset=UTF-8";
axios.defaults.timeout = 100000
// 前端axios添加withCredentials属性
axios.defaults.withCredentials = true
class HttpRequest {
  // constructor(baseUrl = baseURL) {
  //   this.baseUrl = baseUrl
  //   console.log(baseUrl)
  // }
  // getInsideConfig() {
  //   const config = {
  //     baseURL: this.baseUrl
  //   }
  //   return config
  // }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          // _t: new Date().getTime()
        }
      }
      if (config.method === 'post') {
        config.headers.post['Content-Type'] = "'Content-Type': 'multipart/form-data'";
        
      }
      if (token) {
        config.headers.Authorization = token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      res = res.data
      if (res.code == 10021) {
      } else {
        return Promise.resolve(res)
      }
    }, error => {
      return Promise.reject(error)
    })
  }
  request(options, noShowTip) {
    const instance = axios.create()
    // options = Object.assign(this.getInsideConfig(), options)
    // instance.noShowTip = noShowTip
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest;