import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Layout,
  Menu,
  Icon,
  Row,
  Col,
  Avatar,
  Dropdown,
  Badge
} from 'antd';

import {
  withRouter,
  Link
} from 'react-router-dom'

import logo from '../../assets/logo.png'

import './AppFrame.less'

import routes from '../../routes'

const menus = routes.filter(route => route.isMenu === true)

const { Header, Content, Sider } = Layout;

// connect是redux提供的一个方法，这个方法执行之后返回一个高阶组件
// 第一个参数叫mapState，意思就是把store.getState()的结果里的一项或多项注入到当前组件的props上
const mapState = (state )=> {
  return {
    hasUnreadNotification: state.notification.content.some(item => item.hasRead === false),
    unreadNotificationCount: state.notification.content.filter(item => item.hasRead === false).length
  }
}

@connect(mapState)
@withRouter
export default class AppFrame extends Component {
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
    // console.log(this.props)
    const {
      pathname
    } = this.props.location

    const defaultSelectedKey = pathname.split("/").slice(2).join('/')

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Badge count={this.props.unreadNotificationCount} offset={[12,-5]}>
            <Link to={{
              pathname: '/admin/notification'
            }}>待处理消息</Link>
          </Badge>
        </Menu.Item>
        <Menu.Item key="1">
        <Link to={{
              pathname: '/admin/notification'
            }}>消息中心</Link>
        </Menu.Item>
      </Menu>
    );

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
          <Header style={{ background: '#2b3245', padding: 0 }}>
            <Row>
              <Col span={23} style={{textAlign: 'right'}}>
                <span style={{color: '#fff',fontSize:"12px"}}>欢迎您！XXX</span>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Badge dot={this.props.hasUnreadNotification}>
                    <Icon type="bell" style={{color:' #fff',fontSize:'16px'}} />
                  </Badge>
                </Dropdown>
              </Col>
            </Row>
          </Header>
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
