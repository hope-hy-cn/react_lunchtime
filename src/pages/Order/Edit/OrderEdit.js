import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Cascader
} from 'antd'

import E from 'wangeditor'

import moment from 'moment'

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@Form.create()
export default class OrderEdit extends Component {
  constructor () {
    super()
    this.editorRef = createRef()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  componentDidMount () {
    this.props.form.setFieldsValue({
      createAt: moment()
    })

    this.editorE = new E(this.editorRef.current)
    this.editorE.create()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16},
    };
    return (
      <Card
        title="订单编辑"
        bordered={false}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="数量"
          >
            {
              getFieldDecorator('amount', {
                rules: [{ required: true, message: '请输入商品数量！' }],
              })(
                <Input placeholder="商品数量（/件）" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="商品总价"
          >
            {
              getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入商品总价' }],
              })(
                <Input placeholder="商品总价（/元）" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="收货人"
          >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入收货人名字' }],
              })(
                <Input placeholder="收货人名字" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
          >
            {
              getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入正确的联系方式' }],
              })(
                <Input placeholder="请输入联系方式" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="收货地址"
          >
            {getFieldDecorator('residence', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu'],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Cascader options={residences} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="时间"
          >
            {
              getFieldDecorator('createAt', {
                rules: [{ required: true, message: '请选择时间' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="备注"
          >
            {
              getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入备注信息' }],
              })(
                <div ref={this.editorRef}></div>
              )
            }
          </Form.Item>
          <Form.Item
            wrapperCol={{span: 16, offset: 4}}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
