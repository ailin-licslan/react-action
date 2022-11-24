//封装柱形图
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
function Bar ({ title, xData, yData, style }) {

  const domRef = useRef()

  //初始化柱形图
  // eslint-disable-next-line
  const chartInit = () => {
    const myChart = echarts.init(domRef.current)
    myChart.setOption(
      {
        title: {
          text: title
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: yData,
            type: 'bar',
            name: '销量',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    )
  }



  //执行一下这个函数 初始化 执行一次
  useEffect(() => {
    chartInit()
  }, [chartInit])



  return <div>
    {/* 准备一个挂载点 */}
    <div ref={domRef} style={style}></div>
  </div>
}

export default Bar