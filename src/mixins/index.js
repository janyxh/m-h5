// 获取url中的参数
export const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
// export const getQueryString = name => {
//   let search = window.location.search.substr(1);
//   let arr = search.split("&");
//   let obj = {};
//   arr.forEach(item => {
//     let arrI = item.split("=");
//     let key = arrI[0];
//     let value = arrI[1];
//     obj[key] = value;
//   });
//   let result = obj[name];
//   return result;
// };
