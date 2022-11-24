import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '../../utils'

const { Option } = Select
const { RangePicker } = DatePicker



const Article = () => {



  //频道列表管理
  const [channelList, setChannelList] = useState([])
  const loadChannelList = async () => {
    const res = await http.get('/channels')
    setChannelList(res.data.channels)
    console.log("channelList is :", channelList)
  }
  useEffect(() => {
    loadChannelList()
    // eslint-disable-next-line
  }, [])

  //文章列表管理  统一管理数据
  // eslint-disable-next-line
  const [article, setArticleList] = useState({
    list: [], //文章列表
    count: 0  //文章数量
  })


  // 参数管理
  // eslint-disable-next-line
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })



  // 发送接口请求  如果异步请求函数需要依赖一些数据变化而重新执行 推荐把它写道内部去
  useEffect(() => {

    async function fetchArticleList () {
      const res = await http.get('/mp/articles', { params })

      debugger
      const { results, total_count } = res.data
      console.log("articleList is :", res.data)
      setArticleList({
        list: results,
        count: total_count
      })
    }

    fetchArticleList()
  }, [params])











  const onFinish = (value) => {
    console.log(value)
  }

  // columns
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  // data 
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: ['http://geek.itheima.net/resources/images/15.jpg'],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]


  return (
    <div>

      {/* 帅选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}>


        <Form initialValues={{ status: -1 }}
          onFinish={onFinish}>


          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue='licslan'
              style={{ width: 300 }}>

              {channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>



        </Form>
      </Card>


      {/*文章列表区域 table */}
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>


    </div>
  )
}

export default Article