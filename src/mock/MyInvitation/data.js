import Mock from "mockjs";
const Random = Mock.Random;
// 数据

// 获取邀请列表
export const getData = {
  data: {
    "items|1-30": [
      {
        id: Random.id(),
        name: Random.ctitle(),
        updateTime: Date.now(),
        "status|1": true,
        // gradeName: "青铜",
        "gradeName|1": ["青铜", "白银", "普通", "钻石", "黄金"],
        ProtectionPeriod: "1天",
        img: Random.dataImage("200x200", "MOP")
      }
    ],
    "total|1-100": 0
  },
  message: "success",
  respCode: "0000"
};
