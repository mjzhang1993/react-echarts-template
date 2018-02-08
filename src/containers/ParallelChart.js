/*
   Parallel 平行坐标系
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'echarts/lib/component/title';
import 'echarts/lib/component/parallel';
import 'echarts/lib/component/parallelAxis';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/chart/line';
import Chart from '../components/Chart/index';
import { getChart } from '../modules/charts/actions';

class ParallelChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderer: 'canvas'
      };
   }
   async componentWillMount() {
      const path = '/parallel';
      const key = 'parallel';
      
      await this.props.getChart({ path, key });
   }
   render() {
      const renderer = this.state.renderer;
      const option = this.getOption();
      
      return <Chart renderer={renderer} option={option} />;
   }
   getOption = () => {
      const currentData = this.props.charts.parallel;
      const schema = [
         {name: 'province', text: '省份', index: 0},
         {name: 'age', text: '平均年龄', index: 1},
         {name: 'gender', text: '性别比例（男/女）', index: 2},
         {name: 'single', text: '平均单价', index: 3},
         {name: 'count', text: '年购买量', index: 4},
         {name: 'total', text: '年总花费总额', index: 5},
         {name: 'population', text: '参与调查人数', index: 6},
      ];
      
      return {
         backgroundColor: '#4b5769',
         title: {
            text: '各省份手机销售数据',
            subText: '假数据',
            left: 'center',
            textStyle: {
               color: '#eee'
            }
         },
         visualMap: {
            show: true,
            dimension: 0,
            calculable: true,
            inRange: {
               color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
            },
            min: 0,
            max: 30
         },
         parallel: {
            left: '10%',
            right: '13%',
            bottom: '10%',
            top: '20%',
            layout: 'vertical',
            parallelAxisDefault: {
               type: 'value',
               nameLocation: 'end',
               nameGap: 20,
               nameTextStyle: {
                  fontSize: 12,
                  color: '#eee'
               },
               nameRotate: 30,
               axisLine: {
                  lineStyle: {
                     color: '#bbb'
                  }
               },
               axisLabel: {
                  inside: true,
                  rotate: -45,
                  align: 'right',
                  margin: -5,
               }
            },
         },
         dataset: {
            source: currentData
         },
         parallelAxis: [
            {dim: 0, name: schema[0].text, type: 'category'},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text, type: 'log'},
            {dim: 6, name: schema[6].text, type: 'log'},
         ],
         series: [
            {
               name: '各省份手机销售数据',
               type: 'parallel',
               lineStyle: {
                  width: 1,
                  opacity: 0.5
               },
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
)(ParallelChart);
