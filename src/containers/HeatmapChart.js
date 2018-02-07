/*
   Heatmap 热力图
   主要通过颜色去表现数值大小，必须配合 visualMap 组件使用
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/visualMap';
import Chart from '../components/Chart/index';
import { getChart } from '../modules/charts/actions';

class HeatmapChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderer: 'canvas'
      };
   }
   async componentWillMount() {
      const path = '/heatmap';
      const key = 'heatmap';

      await this.props.getChart({ path, key });
   }
   render() {
      const renderer = this.state.renderer;
      const option = this.getOption();

      return <Chart renderer={renderer} option={option} />;
   }
   getOption = () => {
      const currentData = this.props.charts.heatmap;

      return {
         tooltip: {
            position: 'top'
         },
         grid: {
            containLabel: true
         },
         xAxis: {
            type: 'category',
            splitArea: {
               show: true
            },
            boundaryGap: true
         },
         yAxis: {
            type: 'category',
            splitArea: {
               show: true
            },
            boundaryGap: true
         },
         visualMap: {
            min: 0,
            max: 20,
            calculable: true,
            left: 'left',
            bottom: 'bottom',
            dimension: 2
         },
         dataset: {
            source: currentData
         },
         series: [
            {
               name: '热力图',
               type: 'heatmap',
               emphasis: {
                  itemStyle: {
                     shadowBlur: 10,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
               },
               encode: {
                  x: 0,
                  y: 1
               },
               tooltip: {
                  formatter(params) {
                     const [x, y, value] = params.data;

                     return [`x: ${x}`, `y: ${y}`, `value: ${value}`].join('<br/>');
                  }
               }
            }
         ]
      };
   };
}

export default connect(
   state => ({ charts: state.charts }),
   dispatch => ({
      getChart: bindActionCreators(getChart, dispatch)
   })
)(HeatmapChart);
