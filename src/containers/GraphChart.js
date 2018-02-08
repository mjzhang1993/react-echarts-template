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
      // const currentData = this.props.charts.graph;
     
      return {
         series: [
            {
               type: 'graph',
               layout: 'none',
               symbolSize: 50,
               roam: true,
               label: {
                  normal: {
                     show: true
                  }
               },
               edgeSymbol: ['circle', 'arrow'],
               edgeSymbolSize: [4, 10],
               edgeLabel: {
                  normal: {
                     textStyle: {
                        fontSize: 20
                     }
                  }
               },
               data: [{
                  name: '节点1',
                  x: 300,
                  y: 300
               }, {
                  name: '节点2',
                  x: 800,
                  y: 300
               }, {
                  name: '节点3',
                  x: 550,
                  y: 100
               }, {
                  name: '节点4',
                  x: 550,
                  y: 500
               }],
               // links: [],
               links: [{
                  source: 0,
                  target: 1,
                  symbolSize: [5, 20],
                  label: {
                     normal: {
                        show: true
                     }
                  },
                  lineStyle: {
                     normal: {
                        width: 5,
                        curveness: 0.2
                     }
                  }
               }, {
                  source: '节点2',
                  target: '节点1',
                  label: {
                     normal: {
                        show: true
                     }
                  },
                  lineStyle: {
                     normal: { curveness: 0.2 }
                  }
               }, {
                  source: '节点1',
                  target: '节点3'
               }, {
                  source: '节点2',
                  target: '节点3'
               }, {
                  source: '节点2',
                  target: '节点4'
               }, {
                  source: '节点1',
                  target: '节点4'
               }],
               lineStyle: {
                  normal: {
                     opacity: 0.9,
                     width: 2,
                     curveness: 0
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
)(GraphChart);
