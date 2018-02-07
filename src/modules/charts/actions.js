
import {getData} from '../../api/charts';
import { GET_CHART } from '../types-constant';

export function getChart({path, key}) {
   return async dispatch => {
      const newData = await getData(path);
      
      await dispatch({
         type: GET_CHART,
         msg: {key, value: newData}
      });
   }
}

