import { GET_CHART } from '../types-constant';

// state 初始化数据
const initialState = {
   routePaths: [
      {
         path: 'heatmap',
         name: '热力图'
      }
   ],
   heatmap: [[]]
};

const typesCommands = {
   [GET_CHART](state, action) {
      const { key, value } = action.msg;

      return Object.assign({}, state, {
         [key]: value
      });
   }
};

export default function home(state = initialState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}
