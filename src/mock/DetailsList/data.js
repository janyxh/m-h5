import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取收支明细
export const getData = {
  data: {
    "items|1-10": [
      {
        id: Random.id(),
        name: Random.ctitle(),
        updateTime: Date.now(),
        "money|-100-100": 1
      }
    ],
    "total|1-100": 0
  },
  message: "success",
  respCode: "0000"
};
