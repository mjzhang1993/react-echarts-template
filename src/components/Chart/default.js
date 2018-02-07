/*
   App 容器组件的子组件，顶部状态栏
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/boxplot';
import 'echarts/map/js/china';
import prepareBoxplotData from 'echarts/extension/dataTool/prepareBoxplotData'; // echarts 提供的工具函数
import Chart from '../Chart/index';

import '../../scss/app.scss';

@withRouter
export default class AppCom extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderer: 'canvas'
      };
   }
   async componentWillMount() {
      const path = '/boxplot';
      const key = 'boxplot';
      
      await this.props.getChart({ path, key });
   }
   render() {
      const renderer = this.state.renderer;
      const option = this.getOption();
      
      return (
         <div id="app-container">
            <Chart renderer={renderer} option={option}/>
         </div>
      );
   }
   computedData = (currentData) => {
      return prepareBoxplotData(currentData);
   }
   getOption = () => {
      const currentData = this.props.charts.boxplot;
      const data = this.computedData(currentData);
      
      return {
         title: [
            {
               text: '箱型图',
               left: 'center'
            },
            {
               text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
               borderColor: '#999',
               borderWidth: 1,
               textStyle: {
                  fontSize: 14
               },
               left: '10%',
               top: '90%'
            }
         ],
         tooltip: {
            trigger: 'item',
            axisPointer: {
               type: 'shadow'
            },
            formatter(param) {
               return [
                  `Experiment ${param.name}:`,
                  `upper: ${param.data[5]}`,
                  `Q3: ${param.data[4]}`,
                  `median: ${param.data[3]}`,
                  `Q1: ${param.data[2]}`,
                  `lower: ${param.data[1]}`
               ].join('<br/>');
            }
         },
         grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
         },
         xAxis: {
            type: 'category',
            coordinateSystem: 'cartesian2d', // 系列使用的坐标系
            data: data.axisData,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
               show: false
            },
            axisLabel: {
               formatter: 'expr {value}'
            },
            splitLine: {
               show: false
            }
         },
         yAxis: {
            type: 'value',
            name: 'km/s minus 299,000',
            splitArea: {
               show: true
            }
         },
         series: [
            {
               name: 'boxplot',
               type: 'boxplot',
               data: data.boxData,
            },
            {
               name: 'outlier',
               type: 'scatter',
               data: data.outliers
            }
         ]
      };
   }
}
