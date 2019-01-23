import {
  Dashboard,
  JobDiaryList,
  JobDiaryEdit,
  DepartmentList,
  DepartmentEdit,
  FinanceList,
  FinanceEdit,
  NewsList,
  Notification
} from './pages'

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '管理首页',
    iconType: 'user',
    isMenu: true,
    exact: false
  },
  {
    path: '/jobdiary/list',
    component: JobDiaryList,
    title: '工作日志',
    iconType: 'read',
    isMenu: true,
    exact: false
  },
  {
    path: '/jobdiary/edit/:id',
    component: JobDiaryEdit,
    title: '编辑日志',
    isMenu: false,
    exact: false
  },
  {
    path: '/finance/list',
    component: FinanceList,
    title: '财务管理',
    iconType: 'pay-circle',
    isMenu: true,
    exact: false
  },
  {
    path: '/finance/edit/:id',
    component: FinanceEdit,
    title: '账单修改',
    isMenu: false,
    exact: false
  },
  {
    path: '/department/list',
    component: DepartmentList,
    title: '部门管理',
    iconType: 'team',
    isMenu: true,
    exact: false
  },
  {
    path: '/department/edit/:id',
    component: DepartmentEdit,
    title: '部门修改',
    isMenu: false,
    exact: false
  },
  {
    path: '/news/list',
    component: NewsList,
    title: '消息中心',
    iconType: 'mail',
    isMenu: true,
    exact: false
  },
  {
    path: '/notification',
    component: Notification,
    title: '未处理消息',
    isMenu: false,
    exact: false
  }
]

export default routes