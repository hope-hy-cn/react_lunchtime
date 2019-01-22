import {
  Dashboard,
  JobDiaryList,
  JobDiaryEdit,
  DepartmentList,
  DepartmentEdit,
  FinanceList,
  FinanceEdit,
  NewsList
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
    path: '/jobdiary/list',
    component: JobDiaryList,
    title: '工作日志',
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
    component: DepartmentList,
    title: '财务管理',
    isMenu: true,
    exact: false
  },
  {
    path: '/finance/edit/:id',
    component: DepartmentEdit,
    title: '账单修改',
    isMenu: false,
    exact: false
  },
  {
    path: '/department/list',
    component: FinanceList,
    title: '部门管理',
    isMenu: true,
    exact: false
  },
  {
    path: '/department/edit/:id',
    component: FinanceEdit,
    title: '部门修改',
    isMenu: false,
    exact: false
  },
  {
    path: '/news/list',
    component: NewsList,
    title: '消息中心',
    isMenu: true,
    exact: false
  }
]

export default routes