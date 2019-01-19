import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取推广订单列表
export const getData = {
  data: {
    items: [
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      },
      {
        id: Random.id(),
        name: Random.ctitle(),
        "status|0-2": 0,
        "mode|1": [1, 0],
        "price|0-1000": 1,
        note: "消费者以会员价购买，分销员无佣金",
        "commission|1-20": 1,
        updateTime: Date.now(),
        img: Random.dataImage("200x200", "MOP")
      }
    ],
    "total|1-100": 0
  },
  message: "success",
  respCode: "0000"
};
