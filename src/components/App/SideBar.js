import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class SideBar extends Component {
   constructor(props) {
      super(props);
   }
   static defaultProps = {
      routePaths: []
   };
   render() {
      const { routePaths } = this.props;

      return (
         <ul className="main-sidebar menu-container">
            {routePaths.map(item => {
               return (
                  <li className="menu-item" key={item.path}>
                     <Link to={{ pathname: item.path }}>{item.path.toUpperCase() + `（${item.name}）`}</Link>
                  </li>
               );
            })}
         </ul>
      );
   }
}

export default withRouter(SideBar);
