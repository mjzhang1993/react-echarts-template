/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
/*
* 暂时没用 按需加载
* */
// import lazyLoad from './lazyLoad';
import App from '../containers/App';
import HeatmapChart from '../containers/HeatmapChart';

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={HeatmapChart} />
                     <Route path="/heatmap" component={HeatmapChart} />
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
         <Route render={() => <Redirect to="/" />} />
      </Switch>
   </div>
);

export default hot(module)(Root);
