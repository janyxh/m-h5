import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取分组
export const getData = {
  data: {
    "items|1-30": [
      {
        id: Random.id(),
        title: Random.ctitle(),
        updateTime: Date.now(),
        "price|0-1000": 1,
        "rate|0-100": 1,
        img:
          "http://img5.imgtn.bdimg.com/it/u=391191596,1914164745&fm=26&gp=0.jpg"
      }
    ],
    "total|1-100": 0
  },
  message: "success",
  respCode: "0000"
};
