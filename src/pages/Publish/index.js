import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
import { useSearchParams } from 'react-router-dom'

const { Option } = Select

const Publish = () => {


  const { channelStore } = useStore()

  const [fileList, setFileList] = useState([])
  // 上传成功回调
  const cachImageList = useRef()

  const onUploadChange = info => {

    const fileList = info.fileList.map(file => {
      //上传完毕 做数据处理
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      //否则在上传中 不做处理
      return file
    })
    setFileList(fileList)
    cachImageList.current = fileList
  }

  //图片切换
  const [imgCount, setImgCount] = useState(1)
  const changeType = e => {

    console.log("pic e is  :", e.target.value)
    const count = e.target.value
    setImgCount(count)

    if (count === 1) {
      const img = cachImageList.current ? cachImageList.current[0] : []
      setFileList([img])
    }

    else if (count === 3) {
      setFileList(cachImageList.current)
    }
  }


  const navigate = useNavigate()
  //表单提交接口
  const onFinish = async (values) => {
    console.log("submit test :", values)
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }

    console.log("参数：", params)

    //更新接口
    if (articleId) {
      //PUT 
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      //调用上传接口 新增接口 POST 
      await http.post('/mp/articles?draft=false', params)
    }



    navigate('/article')

    message.success(`${articleId ? '更新成功' : '发布成功'}`)

  }



  //编辑  文案功能 文案适配
  const [params] = useSearchParams()
  const articleId = params.get('id')


  //数据回填  表单回填  暂存列表  upLoad 组件 fileList
  const form = useRef(null)
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${articleId}`)
      const data = res.data
      // 动态设置表单数据 回填表单
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      // form.current.setFieldsValue(res.data)
      //回填upLoad
      const formatImages = data.cover.images.map(url => {
        return { url }
      })
      setFileList(formatImages)
      //暂存列表也存一份
      cachImageList.current = formatImages

    }
    //articleId存在才可以
    if (articleId) {
      loadDetail()
      console.log("form is :", form.current)
    }

  }, [articleId])




  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'this is content' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>


          {/* 图片上传 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>



            {/* 图片选择> 0 的上传最后才显示 */}
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}


          </Form.Item>


          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '编辑' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)