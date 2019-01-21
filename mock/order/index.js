const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const orderList = ({offset=0, limited=10}) => {
  const idStart = offset + 1000
  const totalCount = 50
  const currentPage = offset / limited + 1;
  const isLastPage = currentPage >= totalCount / limited;
  const dataCount = isLastPage && (totalCount%limited !== 0) ? (totalCount%limited) : limited;
  const data = `data|${dataCount}`;
  return Mock.mock(
    {
      "code": 200,
      [data]: [
        {
          "orderid|+1": idStart,
          "title": "@ctitle(5,8)",
          "amount": "@integer(1,10)",
          "name": "@cname",
          "createAt": "@datetime('T')",
          'phone': /^1[385][1-9]\d{8}/,
          "address": "@county(true)",
          "orderstatus|1": [
            "待付款",
            "已付款",
            "待发货",
            "待收货"
          ],
          "number": "@id",
          "price|100-1000": 1
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

router
  .post('/api/v1/orderList',(req,res) => {
    res.json(orderList(req.body))
  })
  .post('/api/v1/order/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })

module.exports = router