/*
   App 容器组件的子组件，顶部状态栏
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SideBar from './SideBar';
import './app.scss';

class AppCom extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: 'this is title'
      };
   }
   static defaultProps = {
      routePaths: []
   };
   render() {
      const { title } = this.state;
      const { routePaths } = this.props;

      return (
         <div id="app-container">
            <header className="header">this is React-ECharts-Template</header>
            <div className="main">
               <SideBar className="main-sidebar" routePaths={routePaths} />
               <div className="main-charts-content">
                  <header className="main-header">
                     <p>{title}</p>
                  </header>
                  <div className="charts">{this.props.children}</div>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(AppCom);
