import React, { Component } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Tag,
  Tooltip,
  Modal,
  message,
  Card
} from 'antd'

import './JobDiaryList.less'

import XLSX from 'xlsx'

export default class OrderList extends Component {
  columns = [{
    title: '订单编号',
    dataIndex: 'number',
    key: 'number',
  }, {
    title: '商品名称',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount'
  },{ 
    title: '总价',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '订单状态',
    dataIndex: 'orderstatus',
    key: 'orderstatus',
    render: sta => {
      let color = ""
      switch(sta) {
        case '待付款': 
          color = 'blue';
          break;
        case '已付款':
          color = 'red';
          break;
        case '待发货':
          color = 'green';
          break;
        case '待收货':
          color = 'yellow';
          break;
        default:
          break;
      }
  
      return <Tag color={color}>{sta}</Tag>
    }
  }, { 
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, { 
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  }, { 
    title: '收货地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '添加日期',
    dataIndex: 'createAt',
    key: 'createAt',
    render: (createAt) => {
      return moment(Number.parseInt(createAt, 10)).format('YYYY-MM-DD hh:mm:ss');
    }
  }, {
    title: '操作',
    key: 'actions',
    render: (text, record, index) => {
      return (
        <Button.Group size='small'>
          <Tooltip placement="top" title="编辑">
            <Button type="primary" onClick={this.handleEdit.bind(this, record.orderid)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button type="danger" onClick={this.handleDelete.bind(this, record.orderid, record.title)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </Button.Group>
      )
    }
  }]

  constructor () {
    super ()
    this.isComponentMounted =false
    this.state = {
      dataSource: [],
      totalCount: 0,
      // 每页显示条数
      pageSize: 10,
      // 当前页
      currentPage: 1,
      isLoading: false
    }
  }

  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    this.http.fetchOrderList({
      offset: (this.state.currentPage - 1) * this.state.pageSize,
      // 每页显示条数
      limited: this.state.pageSize
    })
      .then(resp => {
        if (this.isComponentMounted === false) {
          return;
        }
        if (resp.data.code === 200) {
          this.setState({
            dataSource: resp.data.data,
            totalCount: resp.data.totalCount,
            currentPage: resp.data.currentPage,
            isLoading: false
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleEdit = (id) => {
    this.props.history.push(`/admin/jobdiary/edit/${id}`, {
      ceshichuancan: 1
    })
  }
  handleDelete = (id, title) => {
    Modal.confirm({
      // 垂直居中展示 Modal
      centered: true,
      // 点击蒙层是否允许关闭
      maskClosable: true,
      // 	确认按钮文字
      okText: "我确定",
      // 取消按钮文字
      cancelText: "我点错了",
      content: <span>确认要删除<span style={{color: '#f00', padding: '0 5px'}}>{title}</span>吗？</span>,
      // 点击确定回调
      onOk: () => {
        this.setState({
          isLoading: true
        })
        this.http.deleteOrderById(id)
        .then(resp => {
          if (resp.data.code === 200) {
            this.setState({
              currentPage: 1
            }, () => {
              this.fetchArticles()
              message.success(resp.data.msg)
            })
          }
        })
      }
    })
  }

  onTableChange = ({current, pageSize}) => {
    const currentPage = (this.state.pageSize === pageSize) ? current : 1
    this.setState({
      currentPage,
      pageSize
    }, () => {
      this.fetchArticles()
    })
  }

  exportXlsx = () => {
    const title = this.columns.map(item => item.title)
    // 删除最后一个（操作）
    title.pop()

    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.number, item.title, item.amount, item.price, item.express, item.createAt]
      result.push(row)
      return result
    }, [])
    data.unshift(title)

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "articles.xlsx");
  }

  componentDidMount() {
    this.isComponentMounted = true
    this.fetchArticles()
  }

  componentWillUnmount() {
    this.isComponentMounted = false
  }

  render() {
    return (
      <Card
      title="订单列表"
      extra={<Button size="small" type="primary" onClick={this.exportXlsx}>导出excel</Button>}
      bordered={false}
      >
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.orderid}
          dataSource={this.state.dataSource}
          columns={this.columns}
          onChange={this.onTableChange}
          pagination={{
            pageSize: this.state.pageSize,
            // 是否可以改变 pageSize
            hideOnSinglePage: true,
            // 是否可以快速跳转至某页
            showQuickJumper: true,
            // 数据总数
            total: this.state.totalCount,
            // 当前页数
            current: this.state.currentPage,
            // 指定每页可以显示多少条
            pageSizeOptions: ['5','10','15','20'],
            // 是否可以改变 pageSize
            showSizeChanger: true,
            // 用于显示数据总量和当前数据顺序
            showTotal: (total, range) => {
              return <span>总共有<Tag>{total}</Tag>条订单</span>
            },
            // 当为「small」时，是小尺寸分页
            // size: 'small'
          }}
          />
      </Card>
    )
  }
}
