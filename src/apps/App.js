/**

{
  "data": [
    {
      "id": 1,
      "name": "吃饭",
      "des": "干饭人干饭魂"
    },
    {
      "id": 2,
      "name": "睡觉",
      "des": "不如睡觉写代码不如睡觉"
    },
    {
      "id": 3,
      "name": "打豆豆",
      "des": "不如睡觉写代码不如睡觉"
    },
    {
      "id": 4,
      "name": "写vue代码",
      "des": "不如睡觉写代码不如睡觉"
    }
  ]
}


*/

















//LICSLAN React学习 整体第二遍敲代码熟悉基础知识理解:compontent,通讯,JSX,ES6,样式,state,生命周期,路由等,项目实战融会贯通掌握它...

import React, { createRef, useEffect, useState } from 'react'
import '../basic/app.css'
import { v4 as uuid } from 'uuid'
import { Button, Input, Popconfirm, Table } from 'antd'
import axios from 'axios'
import Home from '../basic/Home'
import About from '../basic/About'
import Login from '../basic/Login'
import Layout from '../basic/Layout'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Borad from '../basic/Borad'
import Article from '../basic/Article'
import NotFount from '../basic/NotFount'





const { Search } = Input
//1.识别常规变量
const name = 'LICSLAN'
//2.原生JS调用
const hello = () => {
  return 'REACT'
}
//3.三元运算符
const flag = true
//4.列表渲染 遍历时需要key 不可重复 提高diff性能  key在react内部使用 不在出现在dom中
const songs = [
  { id: 1, name: 'How long will i love you' },
  { id: 2, name: 'Take me to your heart' },
  { id: 3, name: 'My love' }
]
//5.样式控制 1.行内样式 2.还有类名绑定的样式 className = 'xx'  import './app.css' 可以实现
const flagTest = true
const styleTest = {
  color: 'blue',
  fontSize: '18px'
}
//6.函数组件 首字母大写
function Hello () {
  const clickTest = (e, msg) => {
    //阻止默认跳转行为  还有其他的也可以 具体可以查官网或者相关资料去了解
    e.preventDefault()
    console.log('function event was tirrgered!', e, msg)
  }
  return flagTest ? (<div onClick={clickTest} className={flag ? 'active' : 'activeV2'}>
    {/* 传递e & 其他的参数 需要改写成 onClick={(e) => clickTest(e, 'this is msg')} */}
    Hi, this is a fuction component</div>) : (<div><a onClick={(e) => clickTest(e, 'this is msg')} href="https://www.baidu.com">百度一下</a></div>)



}
//7.类组件创建和渲染 首字母大写
class HelloV2 extends React.Component {

  //事件回调函数  标准写法避免this指向问题（这样写回调函数中的this指向的是当前组件的实例对象）  类组件需要this.functionName调用哈 和函数组件不一样
  clickTest = () => {
    console.log('class event was tirrgered!')
  }

  render () {
    return <div onClick={this.clickTest} className={!flagTest ? 'active' : 'activeV2'}>Hi, this is a class component!</div>
  }
}

//8.组件状态  一个前提 在react hook出现之前 函数组件没有state的  统一使用类组件来实现自己的状态！！！
//步骤：初始化状态 --> 读取状态--> 修改状态--> 影响视图
//注意使用标准写法  箭头函数  避免this指向问题 

class StateTest extends React.Component {

  // constructor(){
  //   super()
  //   this.state={
  //     count:0
  //   }
  // }
  //上面的写法可以简化成下面的

  state = {
    count: 1
  }

  addNum = () => {
    //state不可以直接赋值修改 只能this.setState({})
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    //render 指向 当前 组件的实例对象
    console.log('this is :', this)
    return (<div className={!flagTest ? 'active' : 'activeV2'}>
      <span>计数: {this.state.count} </span>
      <button onClick={this.addNum}> +1 </button>
    </div>)
  }
}

//9.受控组件 受react 控制  非受控组件 createRef()操作
class InputControl extends React.Component {

  state = {
    msg: 'this is contorl component'
  }


  getValue = (e) => {

    console.log("print something...", e, "uuid ===>", uuid())

    //获取input框输入的最新值 赋值给state 的 msg
    this.setState({
      msg: e.target.value
    })
  }

  render () {
    return (
      <>
        {/* 给input value属性绑定react state */}
        <input type='text' value={this.state.msg} onChange={this.getValue} />
      </>
    )
  }
}
class InputNotControl extends React.Component {

  msgRef = createRef()

  getRef = () => {
    console.log(this.msgRef.current.value)
  }

  render () {
    return (
      <>
        <input type='text' ref={this.msgRef} />
        <button onClick={this.getRef}>获取值</button>
      </>
    )
  }
}


//10.组件通讯 
//父传子  props   （任意格式参数 function 需要注意  作为子传父的基础）  
//子传父 ：子组件调用父组件传过来的函数 并且把想要传递的数据当成函数的实参传入即可
//兄弟组件传递  father sonA sonB  1.sonB --> father(函数调用) 2.fateher-->sonA(props)
//Context 组件通讯  爷孙通讯之类的  {Provider, Consumer}=createContext()
//此时练习内容可以复习 https://www.bilibili.com/video/BV1Z44y1K7Fj?
//p=45&spm_id_from=pageDriver&vd_source=bbb985ceadc8e3199d1d5a091b58155b  p37-44 or 看 hello-react即可



//11.小demo练手  实现功能先不抽离组件  完成基础渲染后再去抽离组件
function ListDemoPlay ({ item, delItem }) {
  return <>
    <h3 style={{ fontSize: '10px' }}>{item.name}</h3>
    <p style={{ fontSize: '10px' }}>{item.price}</p>
    <p style={{ fontSize: '10px' }}>{item.info}</p>
    <button onClick={() => delItem(item.id)} style={{ fontSize: '10px' }}>Delete</button>
  </>
}

//12 children属性 表示该组件的子节点，只要组件内部有子节点，props中就有该属性  高阶组件时注意回来联想一下哈  高阶函数哈
//参考:https://www.bilibili.com/video/BV1Z44y1K7Fj?p=46&spm_id_from=pageDriver&vd_source=bbb985ceadc8e3199d1d5a091b58155b

//13.组件校验  npm i prop-types 默认值 基础类型  https://www.yuque.com/fechaichai/qeamqf/xbai87#4e4ef7cd
//参考：https://www.bilibili.com/video/BV1Z44y1K7Fj?p=47&spm_id_from=pageDriver&vd_source=bbb985ceadc8e3199d1d5a091b58155b
//四种常见结构
//1. 常见类型：array、bool、func、number、object、string
//2. React元素类型：element
//3. 必填项：isRequired
//4. 特定的结构对象：shape({})


//14.生命周期  只有类组件才有生命周期  函数组件没有参考： https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

//a.挂载时  constructor()  -->  render()  --> componentDidMount()
//参考： https://www.yuque.com/fechaichai/qeamqf/xbai87#7de55883
class MountStageUnderstanding extends React.Component {


  //创建组件时，最先执行，初始化的时候只执行一次
  constructor() {
    super()
    console.log('1.挂载阶段执行顺序第1步=====> constructor()执行')
  }


  //组件挂载（完成DOM渲染）后执行，初始化的时候执行一次 重要！！  发送Ajax request DOM 操作等  
  componentDidMount () {
    console.log('3.挂载阶段执行顺序第3步=====> componentDidMount()执行')
  }

  //每次组件渲染都会触发
  render () {
    //不要在render()里面调用setState()哈 ！！！无限循环
    console.log('2.挂载阶段执行顺序第2步=====> render()执行')
    return <></>
  }
}

//b.更新时  render() --> compnoentDidUpdate()
class UpdateStageUnderstanding extends React.Component {

  constructor() {
    super()
    this.state = {
      count: 0
    }
  }


  setValue = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  //组件更新后（DOM渲染完毕） DOM操作，可以获取到更新后的DOM内容，不要直接调用setState
  componentDidUpdate () {
    console.log('2.更新阶段执行顺序第2步=====> componentDidUpdate()执行')
  }

  //每次组件渲染都会触发
  render () {
    console.log('1.更新阶段执行顺序第1步=====> render()执行')
    return <>数字：{this.state.count}<button onClick={this.setValue}>update stage</button></>
  }
}

//c.卸载时 compnoentWillUnmount()
class UnmountStageUnderstanding extends React.Component {


  componentWillUnmount () {
    console.log('1.卸载阶段执行=====> compnoentWillUnmount()执行')
  }

  render () {
    return <>123</>
  }
}


//15.hooks 使用   参考文档理解 https://www.yuque.com/fechaichai/qeamqf/xbai87#useRef
//1. 导入 useState 函数
//2. 调用 useState 函数，并传入状态的初始值
//3. 从useState函数的返回值中，拿到状态和修改状态的方法
//4. 在JSX中展示状态
//5. 调用修改状态的方法更新状态


function StudyHook () {

  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(true)
  const [list, setList] = useState([])
  const [y, setY] = useState(0)

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    setY(h)
  })

  function test () {

    setCount(count + 1)
    setFlag(false)
    setList([1, 2, 3])
  }

  //DOM修改
  useEffect(() => {
    document.title = count
  })




  return (
    <>

      <button onClick={() => { setCount(count + 1) }}>{count}</button>
      <br></br>
      count:{count}
      flag:{flag ? '1' : '0'}
      list:{list.join('-')}
      y:{y}
      <button onClick={test}>V2：{count}</button>
    </>
  )
}


//什么是副作用
//副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）

//常见的副作用
//1. 数据请求 ajax发送
//2. 手动修改dom
//3. localstorage操作

//useEffect函数的作用就是为react函数组件提供副作用处理的！





//16.路由学习 router  v6
//传参取值  navigate('/about?id=100') ===> let [params] = useSearchParams() let id = params.get('id')
//传参取值  navigate('/about/100') ===> let [params] = useParams() let id = params.id
//传值参考： https://www.bilibili.com/video/BV1Z44y1K7Fj?p=81&vd_source=bbb985ceadc8e3199d1d5a091b58155b




//17.mobx学习  参考  AppV2.js  APPV3.js store/index.js 
//声明数据  响应式处理  定义action函数  实例化导出 mobox-react-lite只和函数组件配合使用哈  
//按照功能拆分store 模块 根模块中组合子模块  利用context机制依赖注入


//Mobx & React 职责划分
//mobx 业务状态数据来源于后端  业务状态操作逻辑  计算属性 +  操作方法等
//React 渲染业务数据 UI 临时状态维护(react hook useState)  事件触发 调用mobx



//this指向问题  使用  推荐使用 test=()=>{} 这种 箭头函数形式调用  {this.test}
//箭头函数形式
class ATest extends React.Component {
  state = {
    count: 1
  }

  //推荐形式  箭头函数 使用箭头将方法变为匿名调用,使this指向组件实例
  setValueTest = () => {
    console.log("this is :", this)
  }
  render () {
    return (
      <><button onClick={this.setValueTest}>方式一 推荐形式</button></>
    )
  }
}


//不推荐
class BTest extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 2
    }
    this.setValueTest = this.setValueTest.bind(this)
  }

  //在构造函数中绑定组件的this到函数当中,使this指向组件实例
  setValueTest () {
    console.log("this is :", this)
  }
  render () {
    return (
      <><button onClick={this.setValueTest}>方式二 不推荐</button></>
    )
  }
}


//不推荐
class CTest extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 3
    }
  }

  //在调用此方法处绑定组件的this(button的点击方法里),使this指向组件实例
  setValueTest () {
    console.log("this is :", this)
  }
  render () {
    return (
      <><button onClick={this.setValueTest.bind(this)}>方式三 不推荐</button></>
    )
  }
}










class HomeTesting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      msgone: '这是Home组件的第一个栗子',
      msgtwo: '这是Home组件的第二个栗子',
      msgthree: '这是Home组件的第三个栗子',
    }

    this.refreshone = this.refreshone.bind(this)

  }

  //在构造函数中绑定组件的this到函数当中,使this指向组件实例
  refreshone () {
    console.log("this1 is :", this)
    this.setState({
      msgone: '第1个栗子刷新了！',
    })
  }

  //使用箭头将方法变为匿名调用,使this指向组件实例
  refreshtwo = () => {
    console.log("this2 is :", this)
    this.setState({
      msgtwo: '第2个栗子刷新了！',
    })
  }

  //在调用此方法处绑定组件的this(button的点击方法里),使this指向组件实例
  refreshthree () {
    console.log("this3 is :", this)
    this.setState({
      msgthree: '第3个栗子刷新了！',
    })
  }

  render () {
    return (
      <div>
        首页啊
        <h3>{this.state.msgone}</h3>
        <button onClick={this.refreshone}>刷新第1个栗子</button>
        <h3>{this.state.msgtwo}</h3>
        <button onClick={this.refreshtwo}>刷新第2个栗子</button>
        <h3>{this.state.msgthree}</h3>
        <button onClick={this.refreshthree.bind(this)}>刷新第3个栗子</button>
      </div>
    )
  }
}









class TestReturn extends React.Component {
  render () {
    console.log("==", this.props.name)
    return []
  }
}












class App extends React.Component {


  //如果数据是组件状态需要去影响视图 定义到state中 否则定义成普通的实例属性即可  state中尽量保持精简
  state = {
    list:// 列表数据
      [
        { id: 1, name: '超级好吃的棒棒糖', price: 18.8, info: '开业大酬宾，全场8折' },
        { id: 2, name: '超级好吃的大鸡腿', price: 34.2, info: '开业大酬宾，全场8折' },
        { id: 3, name: '超级无敌的冰激凌', price: 14.2, info: '开业大酬宾，全场8折' }
      ],
    flagMark: true,
    listV2: [],
    columns: [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        // render: (text, record) => (
        //   <Space size="middle">
        //     <Popconfirm title="确定要删除吗?"
        //       onConfirm={() => this.handleDelete(record.id)}>
        //       <a href="#xxx">删除</a>
        //     </Popconfirm>
        //   </Space>
        // ),

        render: (_, record) =>
          this.state.listV2.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.delData(record.id)}>
              <a href='#1'>Delete</a>
            </Popconfirm>
          ) : null,

      },
    ]
  }


  //删除
  delData = async (id) => {
    console.log('del data==> ', id)
    await axios.delete(`http://localhost:3001/data/${id}`)

    //load list 
    this.loadList()
  }

  //搜索
  onSearch = async (value) => {
    const res = await axios.get(`http://localhost:3001/data/?q=${value}`)
    console.log(value)
    this.setState({
      listV2: res.data
    })
  }
  //列表  npm install -g json-server install json-server to mock data   
  //json-server --watch ./mock/db.json --port 3001
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log("load list data is ==>", res)
    this.setState({
      listV2: res.data
    })
  }

  componentDidMount () {
    this.loadList()
  }


  //定义一个给子组件传递的函数 
  delItem = (id) => {

    this.setState({

      list: this.state.list.filter(item => item.id !== id)

    })

  }

  modifyFlg = () => {

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    this.setState({
      flagMark: !this.state.flagMark
    })
  }


  render () {

    return (

      //JSX结构
      <div className="App">

        <br />
        <span className={flagTest === true ? 'active' : 'activeV2'}>变量 函数 三元运行</span>
        <ul>
          <li>
            {name} was learning {hello()} !   {flag ? 'Great' : 'Just so so!'}
          </li>
        </ul>

        <br />

        <span style={{ fontSize: '10px' }}>循环遍历 样式控制</span>
        <ul>
          {
            songs.map(item => <li style={styleTest} key={item.id}>{item.name}</li>)
          }
        </ul>

        <br />
        <span style={{ fontSize: '10px' }}>函数组件</span>
        <Hello />
        <br />
        <span style={{ fontSize: '10px' }}>类组件</span>
        <HelloV2 />

        <br />
        <span style={{ fontSize: '10px' }}>类组件 state 学习 了解即可 后面react hook 在函数组件学习</span>
        <StateTest />


        <br />
        <span style={{ fontSize: '10px' }}>受控组件学习</span>
        <br />
        <InputControl />


        <br />
        <span style={{ fontSize: '10px' }}>非受控组件学习</span>
        <br />
        <InputNotControl />

        <br />
        <span style={{ fontSize: '10px' }}>组件综合小练习 组件通讯</span>
        <br />
        <div>
          {
            this.state.list.map(item => (<ListDemoPlay
              key={item.id}
              //父传子
              item={item}
              //子传父案例  函数  子组件调用父组件 回调函数 delItem 将 子组件中的 id传到父组件了 作为删除判断依据
              delItem={this.delItem} />))
          }
        </div>

        <br />
        <span style={{ fontSize: '10px' }}>生命周期挂载阶段学习</span>
        <br />
        <MountStageUnderstanding />

        <br />
        <span style={{ fontSize: '10px' }}>生命周期更新阶段学习</span>
        <br />
        <UpdateStageUnderstanding />



        <br /><br />
        <span style={{ fontSize: '10px' }}>生命周期卸载阶段学习</span>
        <br />
        {
          this.state.flagMark ? <UnmountStageUnderstanding /> : null
        }
        <button onClick={this.modifyFlg}>modify flag</button>

        <span>{this.state.flagMark ? 'true' : 'false'}</span>
        {/* antd css */}

        <br></br>
        <br></br>
        <br></br>
        <Button type='primary'>antd样式测试</Button>


        <br></br>
        <br />

        <div className='container'>
          <div className="search-box">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={this.onSearch}
            />
          </div>
          <Table
            dataSource={this.state.listV2}
            columns={this.state.columns}
            rowKey='id'
          />
        </div>


        <br></br>
        <br></br>
        <span style={{ fontSize: '10px' }}>hook学习</span>
        <StudyHook />


        <br></br>
        <span style={{ fontSize: '10px' }}>router学习</span>
        <br></br>
        {/* 申明非hash格式路由 一个react应用只需要一次 */}
        <BrowserRouter >
          <Link to='/'>首页</Link>
          <Link to='/about'>about</Link>
          <Link to='/login'>login</Link>
          <Routes>
            {/* 定义一级路由 */}
            <Route path='/home' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Layout />}>
              {/* 定义二级路由  index 去掉path 默认二级路由*/}
              <Route index element={<Borad />}></Route>
              <Route path='article' element={<Article />}></Route>
            </Route>
            <Route path='*' element={<NotFount />}></Route>
          </Routes>
        </BrowserRouter>
        <br></br>

        hi :<TestReturn name="123" />
        <br></br>
        helloa: <ATest />
        <br></br>
        hellob: <BTest />
        <br></br>
        helloc: <CTest />
        <br></br>
        helloHome: <HomeTesting />

      </div>
    )
  }
}



export default App
