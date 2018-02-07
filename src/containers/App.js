/*
   App 应用总容器
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppCom from '../components/App/index';

class App extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return <AppCom routePaths={this.props.routePaths}>{this.props.children}</AppCom>;
   }
}

export default connect(state => ({ routePaths: state.charts.routePaths }))(App);
