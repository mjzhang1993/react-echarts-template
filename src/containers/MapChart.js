/*
   Map 地图
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
import Chart from '../components/Chart/index';
import { getChart } from '../modules/charts/actions';

class MapChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         renderer: 'canvas'
      };
   }
   async componentWillMount() {
      const path = '/map';
      const key = 'map';
      
      await this.props.getChart({ path, key });
   }
   render() {
      const renderer = this.state.renderer;
      const option = this.getOption();
      
      return <Chart renderer={renderer} option={option} />;
   }
   getOption = () => {
      const currentData = this.props.charts.map;
      
      return {
         title: {
            text: '手机销量',
            left: 'center'
         },
         tooltip : {
            trigger: 'item'
         },
         visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            calculable : true
         },
         toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
               mark : {show: true},
               dataView : {show: true, readOnly: false},
               restore : {show: true},
               saveAsImage : {show: true}
            }
         },
         legend: {
            orient: 'vertical',
            left: 'left',
            data:['手机销量']
         },
         series: [
            {
               name: '手机销量',
               type: 'map',
               map: 'china', // 地图类型
               roam: true, // 是否开启鼠标缩放和平移
               center: [104, 35], // 当前视角的中心点，用经纬度表示
               aspectScale: 0.75, // 设置地图长宽比
               zoom: 1, // 当前视角缩放比例
               scaleLimit: { // 限制最大最小缩放比例
                  min: 1,
                  max: 2
               },
               selectedMode: 'multiple', // 设置选中模式
               // layoutCenter: ['20%', '70%'], // 定义地图中心在屏幕中的位置
               // layoutSize: 300, // 定义地图大小
               // data 格式 [{name: '地图区域名称', value: '区域的数据值'}]
               data: currentData
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
)(MapChart);
