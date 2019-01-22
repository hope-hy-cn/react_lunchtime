import React, { Component } from 'react'
import {
  Layout, Menu, Icon
} from 'antd';

import {
  withRouter
} from 'react-router-dom'

import logo from '../../assets/logo.png'

import './AppFrame.less'

import routes from '../../routes'

const menus = routes.filter(route => route.isMenu === true)

const { Header, Content, Sider } = Layout;

class AppFrame extends Component {
  handleMenuClick = ({key}) => {
    // console.log(key)
    const {
      history,
      match
    } = this.props

    history.push(`${match.path}${key}`)
  }
  render() {
    const {
      pathname
    } = this.props.location

    const defaultSelectedKey = pathname.split("/").slice(2).join('/')

    // console.log(this.props.location.pathname.split("/").slice(2).join('/'), menus[0].path)
    return (
      <Layout>
        <Header className="header">
          <div className="logo"><img src={logo} alt="logo"/><span className="logo-text">商品订单管理系统</span></div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`/${defaultSelectedKey}`]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick}
            >
              {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.path}>
                      <Icon type="pie-chart" />
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AppFrame)