import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const ajax = axios.create({
  // rap2
  // baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/124739' : ''
  // hy 学校ip
  baseURL: isDev ? 'http://10.7.183.93:4444' : ''
  // hy 家里ip
  // baseURL: isDev ? 'http://192.168.199.193:4444' : ''
})

export const fetchJobDiaryList = (params) => {
  return ajax.post('/api/v1/jobDiaryList', params)
}

export const deleteJobDiaryById = (id) => {
  return ajax.post(`/api/v1/jobDiary/delete/${id}`)
}

export const fetchFinanceList = (params) => {
  return ajax.post('/api/v1/financeList', params)
}

export const deleteFinanceById = (id) => {
  return ajax.post(`/api/v1/finance/delete/${id}`)
}
