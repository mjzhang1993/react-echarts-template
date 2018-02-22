// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function() {
   // 自定义扩展
   Random.extend({});

   // const telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

   const heatmap = (function() {
      const getArr = (end, start = 0) => Array.apply(null, Array(end - start)).map((v, i) => i + start);
      const getValue = (x, y) => (x * x * y * y) % 20;

      const x = getArr(51);
      let data = [];

      x.map(xValue => {
         const currentData = getArr(71).map(y => {
            return [xValue, y, getValue(xValue, y)];
         });

         data = data.concat(currentData);
      });

      return data;
   }());

   const map = (function() {
      const initialProvinces = Mock.mock({
         'content|90': ['@province']
      }).content;
      const adapter = {
         黑龙: '黑龙江',
         内蒙: '内蒙古'
      };
      const data = [...new Set(initialProvinces)].map(p => {
         const subP = p.substr(0, 2);
         return {
            name: adapter[subP] || subP,
            value: Random.float(0, 1000, 2, 2)
         };
      });

      return data;
   }());

   const parallel = (function() {
      const provinces = Mock.mock({
         'content|90': ['@province']
      }).content;
      const adapter = {
         黑龙: '黑龙江',
         内蒙: '内蒙古'
      };
      const getAge = () => Random.natural(10, 80);
      const getGender = () => Math.random();
      const getTotal = (single, count) => single * count;
      const getSingle = () => Random.natural(100, 10000);
      const getCount = () => Random.natural(1, 5);
      const getPopulation = () => Random.natural(1000, 100000);
      const data = [...new Set(provinces)].map(p => {
         const subP = p.substr(0, 2);
         const province = adapter[subP] || subP;
         const single = getSingle();
         const count = getCount();

         return [province, getAge(), getGender(), single, count, getTotal(single, count), getPopulation()];
      });

      return data;
   }());

   const graph = (function() {
      const names = Mock.mock({
         'names|300': '@cfirst'
      }).names;
      const data = [...new Set(names)].map(name => {
         return {
            name,
            value: Random.natural(0, 300),
            x: Random.float(-500, 500),
            y: Random.float(-500, 500),
            category: Random.natural(0, 5)
         };
      });
      function getIdx(initial, range) {
         const idx = Random.natural(0, range);
         if (initial !== idx) {
            return idx;
         }

         return getIdx(initial, range);
      }
      const range = data.length - 1;
      const linkNums = Random.natural(0, range * 2);
      let links = [];

      for (let i = 0; i < linkNums; i++) {
         const sourceIdx = Random.natural(0, range);
         const targetIdx = getIdx(sourceIdx, range);
         const link = {
            source: sourceIdx,
            target: targetIdx,
            value: Random.natural(0, 200)
         };
         links.push(link);
      }

      return { data, links };
   }());

   return {
      heatmap,
      map,
      parallel,
      graph
   };
};
