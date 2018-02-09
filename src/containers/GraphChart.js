/*
   Graph 关系图
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/graphic'
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/line';
import Chart from '../components/Chart/index';
import { getChart } from '../modules/charts/actions';

class GraphChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderer: 'canvas'
      };
   }
   async componentWillMount() {
      const path = '/graph';
      const key = 'graph';
      
      await this.props.getChart({ path, key });
   }
   render() {
      const renderer = this.state.renderer;
      const option = this.getOption();
      
      return <Chart renderer={renderer} option={option} />;
   }
   getOption = () => {
      const {data, links} = this.props.charts.graph;
      return {
         legend: [
            {
               data: ['类目1', '类目2', '类目3', '类目4', '类目5', '类目6']
            }
         ],
         series: [
            {
               type: 'graph',
               layout: 'force',
               // symbolSize: 50,
               roam: true,
               label: {
                  show: true
               },
               force: {
                  initLayout: 'circular'
               },
               draggable: true, // 节点可拖拽
               focusNodeAdjacency: false, // 鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
               edgeSymbol: ['none', 'none'], // 边两端标记
               edgeLabel: {
                  show: false,
                  position: 'middle',
                  textStyle: {
                     fontSize: 20
                  }
               },
               itemStyle: { // 图形样式
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
               },
               lineStyle: { // 线条样式
                  opacity: 0.9,
                  width: 1,
                  curveness: 0.2
               },
               label: { // 图形上文本
                  color: '#eee',
                  fontSize: 10
               },
               categories: [ // 节点分类的类目
                  {name: '类目1', itemStyle: {color: '#C33332'}, label: {show: true}},
                  {name: '类目2', itemStyle: {color: '#2F4553'}, label: {show: true}},
                  {name: '类目3', itemStyle: {color: '#D58267'}, label: {show: true}},
                  {name: '类目4', itemStyle: {color: '#73A085'}, label: {show: true}},
                  {name: '类目5', itemStyle: {color: '#6E7074'}, label: {show: true}},
                  {name: '类目6', itemStyle: {color: '#CB872E'}, label: {show: true}},
               ],
               data: data, // 节点数据
               links: links // 连线数据
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
)(GraphChart);
