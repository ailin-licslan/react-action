//思路
//1.看官方文档  把echarts 引入进来  如何在react 获取dom  ==> useRef  在什么地方可以获取dom节点 ==>useEffect
//2.不抽离定制化参数 先把最小demo跑起来
//3.按照需求 哪些参数是需要自定义可以想想 再抽象一下

import Bar from "../../components/Bar"


function Home () {

  return <div>
    {/* 渲染bar组件 */}
    <Bar
      title={'主流框架使用满意度'}
      xData={['react', 'javascript', 'vue', 'java']}
      yData={[30, 40, 56, 70]}
      style={{ width: '700px', height: '400px' }}></Bar>
  </div>
}

export default Home