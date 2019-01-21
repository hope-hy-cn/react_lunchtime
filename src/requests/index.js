import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/124739' : ''
})

export const fetchOrderList = () => {
  return ajax.post('/api/v1/orderList')
}

export const deleteOrderById = (id) => {
  return ajax.post(`/api/v1/order/delete/${id}`)

  // 模拟数据请求
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       code:200,
  //       msg: '删除成功'
  //     })
  //   },1000)
  // })
}
