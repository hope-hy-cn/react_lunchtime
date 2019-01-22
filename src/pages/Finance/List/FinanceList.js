import React, { Component } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Tag,
  Modal,
  message,
  Card
} from 'antd'

import './FinanceList.less'

import XLSX from 'xlsx'
export default class FinanceList extends Component {
  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '项目名称',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: sta => {
      let color = ""
      switch(sta) {
        case '支出': 
          color = 'blue';
          break;
        case '收入':
          color = 'red';
          break;
        default:
          break;
      }
      return <Tag color={color}>{sta}</Tag>
    }
  }, { 
    title: '金额',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '时间',
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
          <Button type="primary" onClick={this.handleEdit.bind(this, record.id)}>
            <Icon type="edit" />编辑
          </Button>
          <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.title)}>
            <Icon type="delete" />删除
          </Button>
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
    this.http.fetchFinanceList({
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
    this.props.history.push(`/admin/finance/edit/${id}`, {
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
        this.http.deleteFinanceById(id)
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
      const row = [item.id, item.title, item.type, item.price, item.createAt]
      result.push(row)
      return result
    }, [])
    data.unshift(title)

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "financeList.xlsx");
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
      title="记账明细"
      extra={<Button size="small" type="primary" onClick={this.exportXlsx}>导出excel</Button>}
      >
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.id}
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
              return <span>总共有<Tag>{total}</Tag>条账单</span>
            },
            // 当为「small」时，是小尺寸分页
            // size: 'small'
          }}
          />
      </Card>
    )
  }
}
