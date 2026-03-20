import axios from 'axios'
import { Loading, Notify } from 'quasar'
import { router } from '@/router'

const request = function (loadtip, query) {
  if (loadtip) {
    Loading.show({ message: '로딩 중…' })
  }
  return axios.request(query)
    .then(res => {
      if (loadtip) Loading.hide()
      if (res.data.code === 401) {
        router.push({ path: '/login' })
        return Promise.reject(res.data)
      } else if (res.data.code === 500 || res.data.code === 501) {
        Notify.create({ type: 'negative', message: res.data.message })
        return Promise.reject(res.data)
      } else {
        return Promise.resolve(res.data)
      }
    })
    .catch(e => {
      if (loadtip) Loading.hide()
      if (e.message) {
        Notify.create({ type: 'negative', message: e.message })
      }
      return Promise.reject(e)
    })
}

const post = function (url, params) {
  return request(false, {
    baseURL: import.meta.env.VITE_API_URL,
    url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  })
}

const postWithLoadTip = function (url, params) {
  return request(true, {
    baseURL: import.meta.env.VITE_API_URL,
    url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  })
}

const postWithOutLoadTip = function (url, params) {
  return request(false, {
    baseURL: import.meta.env.VITE_API_URL,
    url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  })
}

const get = function (url, params) {
  return request(false, {
    baseURL: import.meta.env.VITE_API_URL,
    url,
    method: 'get',
    withCredentials: true,
    timeout: 30000,
    params,
    headers: { 'request-ajax': true }
  })
}

const form = function (url, params) {
  return request(false, {
    baseURL: import.meta.env.VITE_API_URL,
    url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'multipart/form-data', 'request-ajax': true }
  })
}

export { post, postWithLoadTip, postWithOutLoadTip, get, form }
