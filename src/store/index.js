/*
   创建唯一 store 状态树
*/
import configureStore from './configureStore';
import reducer from '../modules/reducers';

// 给增强后的 createStore 函数传入 reducer，生成唯一的 store 状态树
const store = configureStore(reducer);

if (module.hot) {
   module.hot.accept('../modules/reducers.js', () => {
      console.log('reducer changed');
      store.replaceReducer(require('../modules/reducers').default);
   });
}

export default store;
