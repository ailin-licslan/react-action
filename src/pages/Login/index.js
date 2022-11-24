import { Form, Input, Button, Checkbox, message } from 'antd'
import logo from '../../assets/logo.png'
import './index.scss'
import { Card } from 'antd'
import { useStore } from '../../store/index'
import { useNavigate } from 'react-router-dom'

function Login () {

  // 获取跳转实例对象
  //useStroe
  const { loginStore } = useStore()
  console.log("login ===>", loginStore)


  const navigate = useNavigate()
  const onFinish = async values => {

    const { mobile, code } = values
    try {
      await loginStore.getToken({ mobile, code })
      navigate('/', { replace: true })
      message.success('登录成功')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }

  function onFinishFailed (values) {

    //获取表单失败内容
    console.log(values)
  }

  //参考：https://ant.design/components/form-cn
  return <>
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />

        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true, }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>

          {/* 手机号码 */}
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
              { required: true, message: '请输入手机号' }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              { required: true, message: '请输入验证码' }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>


          {/* 记住我 */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>


          {/* 登录 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>


        </Form>



        {/* <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}

      </Card>
    </div>
  </>

}
export default Login