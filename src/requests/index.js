import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const ajax = axios.create({
  // baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/124739' : ''
  // baseURL: isDev ? 'http://10.7.183.93:4444' : ''
  baseURL: isDev ? 'http://192.168.199.193:4444' : ''
})

export const fetchOrderList = (params) => {
  return ajax.post('/api/v1/orderList', params)
}

export const deleteOrderById = (id) => {
  return ajax.post(`/api/v1/order/delete/${id}`)
}
