// 创建上下拉加载的 mescroll 插件实例

// import MeScroll from "mescroll.js";

// //  element: 列表元素， upCallback： 上拉回调函数
// export const newMeScroll = (element, upCallback, downCallback) => {
//   // console.log(dom);
//   return new MeScroll(element, {
//     down: {
//       callback: downCallback,
//       htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>',
//       empty: {
//         //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
//         warpId: "nodata", //父布局的id (1.3.5版本支持传入dom元素)
//         // icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
//         tip: "暂无数据" //提示
//       }
//     },
//     up: {
//       callback: upCallback,
//       htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>',
//       empty: {
//         //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
//         warpId: "nodata", //父布局的id (1.3.5版本支持传入dom元素)
//         // icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
//         tip: "暂无数据" //提示
//       }
//     }
//   });
// };

// 下拉刷新配置
export const getMescrollDown = downCallback => {
  return {
    callback: downCallback,
    auto: true
  };
};

// 上拉刷新配置
export const getMescrollUp = upCallback => {
  return {
    callback: upCallback,
    auto: false,
    htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>'
    // empty: {
    //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
    //   warpId: "nodata", //父布局的id (1.3.5版本支持传入dom元素)
    //   // icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
    //   tip: "暂无数据" //提示
    // }
  };
};
