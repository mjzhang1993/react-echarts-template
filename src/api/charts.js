/*
   home 的网络请求部分
*/
import { get } from './request';

export function getData(path) {
   return get(path).then(res => res.data);
}

