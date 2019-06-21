import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development'?'api/':'https://dev.ylbservices.com', // url = base url + request url
  baseURL: process.env.NODE_ENV === 'development'?'api/':'https://dev.newdreamservices.com', // url = base url + request url
  timeout: 8000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    config.data = qs.stringify(config.data)
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 1001) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
