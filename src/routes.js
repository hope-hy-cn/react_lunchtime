import {
  Dashboard,
  OrderList,
  OrderEdit
} from './pages'

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '管理首页',
    isMenu: true,
    exact: false
  },
  {
    path: '/order/list',
    component: OrderList,
    title: '订单管理',
    isMenu: true,
    exact: false
  },
  {
    path: '/order/edit/:id',
    component: OrderEdit,
    title: '修改订单',
    isMenu: false,
    exact: false
  }
]

export default routes