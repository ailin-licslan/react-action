import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '../../utils'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'
//import { history } from '../../utils/history'

const { Option } = Select
const { RangePicker } = DatePicker



const Article = () => {



  // //频道列表管理
  // const [channelList, setChannelList] = useState([])

  // useEffect(() => {
  //   const loadChannelList = async () => {
  //     const res = await http.get('/channels')
  //     console.log("res channelList is :", res)
  //     setChannelList(res.data.channels)
  //   }
  //   loadChannelList()
  //   // eslint-disable-next-line
  // }, [])

  // 上面的写法重构 ChannelStore 

  const { channelStore } = useStore()



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
    per_page: 3
  })

  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }



  //发送接口请求  如果异步请求函数需要依赖一些数据变化而重新执行 推荐把它写道内部去
  //统一不抽离函数到外面 只要涉及函数异步请求 都放到useEffect 内部
  //本质区别 写道外面每次组件更新都会重新进行函数初始化 这本身是一次性能消耗 写在内部 只会在函数依赖项发生变化的时候函数才会进行重新初始化
  useEffect(() => {

    async function fetchArticleList () {
      const res = await http.get('/mp/articles', { params })

      const { results, total_count } = res.data
      console.log("articleList is :", res.data)

      setArticleList({
        list: results,
        count: total_count
      })
    }

    fetchArticleList()
  }, [params])





  //del 
  const delArticle = async (data) => {
    //只有一条数据了  后面做了新增再试试！！！
    await http.delete(`/mp/articlesxxxx/${data.id}`)
    // 更新列表
    setParams({
      page: 1,
      per_page: 3
    })
  }


  const navigate = useNavigate()
  function goPublish (data) {
    console.log("edit  ...  :", data)
    navigate(`/publish?id=${data.id}`)
  }








  const onFinish = (values) => {

    console.log(values)

    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params
    })


  }





  // columns
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
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
            <Button type="primary" shape="circle" icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />

            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />

            </Popconfirm>

          </Space>
        )
      }
    }
  ]

  // data 
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       // images: ['http://geek.itheima.net/resources/images/15.jpg'],
  //       images: ['http://geek.itheima.net/uploads/1669283020636.png']
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]


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

              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}

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
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={article.list}
          pagination={{
            pageSize: params.per_page,
            total: article.count,
            onChange: pageChange
          }
          }
        />
      </Card>


    </div>
  )
}

export default observer(Article)