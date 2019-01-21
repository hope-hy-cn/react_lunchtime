const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const orderList = Mock.mock(
  {
    "code": 200,
    "data|48": [
      {
        "orderid|+1": 10048,
        "title": "@ctitle(5,8)",
        "amount": "@integer(1,10)",
        "name": "@cname",
        "createAt": "@datetime('T')",
        "phone": "/^1[1385][1-9]\\d{8}/",
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
    ]
  }
)
router.get('/api/v1/orderList',(req,res) => {
  res.json(orderList)
})

module.exports = router