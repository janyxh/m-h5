import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取客户列表
export const getData = {
  data: {
    "items|1-30": [
      {
        id: Random.id(),
        name: Random.ctitle(),
        "price|0-1000": 1,
        "status|0-2": 0,
        "isPermit|1": true,
        ProtectionPeriod: "1天",
        img:
          "http://img5.imgtn.bdimg.com/it/u=391191596,1914164745&fm=26&gp=0.jpg"
      }
    ],
    "total|1-100": 0
  },
  message: "success",
  respCode: "0000"
};
