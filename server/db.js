// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function() {
   // 自定义扩展
   Random.extend({});

   // const telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

   const heatmap = (function() {
      const getArr = (end, start = 0) => Array.apply(null, Array(end - start)).map((v, i) => i + start);
      const getValue = (x, y) => (x * x * y) % 20;

      const x = getArr(21);
      let data = [];

      x.map(xValue => {
         const currentData = getArr(71).map(y => {
            return [xValue, y, getValue(xValue, y)];
         });

         data = data.concat(currentData);
      });

      return data;
   }());

   return {
      heatmap
   };
};
