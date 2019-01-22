import React, { Component } from 'react'
import {
  Layout, Menu, Icon,
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
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

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

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[`/${defaultSelectedKey}`]}
            mode="inline"
            onClick={this.handleMenuClick}
          >
            {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.path}>
                      <Icon type={item.iconType} />
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                })
              }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#2b3245', padding: 0 }} />
          <Content style={{ margin: '24px 24px' }}>
            <div style={{background: '#fff', minHeight: '80vh' }}>
            {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(AppFrame)