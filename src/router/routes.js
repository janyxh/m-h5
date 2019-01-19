import Index from "@/views/Index/Index";
export const routes = [
  // 首页 招募令
  {
    path: "/",
    name: "home",
    component: Index
  },
  // 申请成为分销员
  {
    path: "/Recruit",
    name: "Recruit",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/views/Recruit/router.vue"),
    // 操作结果
    children: [
      {
        path: "/Apply",
        name: "Apply",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Recruit/Apply/Index.vue")
      },
      {
        path: "/Result",
        name: "Result",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Recruit/Result/Index.vue")
      }
    ]
  },
  // 分销中心
  {
    path: "/DistributionCenter",
    name: "DistributionCenter",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/views/Distribution/router.vue"),
    children: [
      {
        path: "/Distribution",
        name: "Distribution",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/Index.vue")
      },
      // 个人资料
      {
        path: "/UserInfo",
        name: "UserInfo",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/User/router.vue"),
        children: [
          {
            path: "/User",
            name: "User",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/User/Index.vue")
          },
          // 编辑个人资料 - 姓名
          {
            path: "/EditUserName",
            name: "EditUserName",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/User/EditUserName/Index.vue")
          },
          // 编辑个人资料 - 手机号码
          {
            path: "/EditPhoneNumber",
            name: "EditPhoneNumber",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/User/EditPhoneNumber/Index.vue")
          }
        ]
      },
      // 结算中心
      {
        path: "/SettlementCenter",
        name: "SettlementCenter",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/router.vue"),
        children: [
          // 结算中心 首页
          {
            path: "/Settlement",
            name: "Settlement",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/Index.vue")
          },
          // 收支明细列表
          {
            path: "/DetailsList",
            name: "DetailsList",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/DetailsList/Index.vue")
          },
          // 提现记录
          {
            path: "/WithdrawalsRecord",
            name: "WithdrawalsRecord",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/WithdrawalsRecord/Index.vue")
          },
          // 提现
          {
            path: "/Withdrawal",
            name: "Withdrawal",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/Withdrawal/Index.vue")
          },
          // 提现管理
          {
            path: "/WithdrawalManage",
            name: "WithdrawalManage",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/Withdrawal/router.vue"),
            // 设置提现账号
            children: [
              {
                path: "/SetWallet",
                name: "SetWallet",
                component: () =>
                  import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/Withdrawal/SetWallet/Index.vue")
              },
              {
                path: "/WithdrawalResult",
                name: "WithdrawalResult",
                component: () =>
                  import(/* webpackChunkName: "public" */ "@/views/Distribution/Settlement/Withdrawal/Result/Index.vue")
              }
            ]
          }
        ]
      },
      // 商品中心
      {
        path: "/Goods",
        name: "Goods",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/Goods/Index.vue")
      },
      // 累计客户
      {
        path: "/MyCustomer",
        name: "MyCustomer",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/MyCustomer/router.vue"),
        children: [
          {
            path: "/MyCustomerList",
            name: "MyCustomerList",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyCustomer/Index.vue")
          },
          {
            path: "/MyCustomerDetails/:id",
            name: "MyCustomerDetails",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyCustomer/Details/Index.vue")
          }
        ]
      },
      // 累计邀请
      {
        path: "/MyInvitation",
        name: "MyInvitation",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/MyInvitation/router.vue"),
        children: [
          {
            path: "/MyInvitationList",
            name: "MyInvitationList",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyInvitation/Index.vue")
          },
          {
            path: "/MyInvitationDetails/:id",
            name: "MyInvitationDetails",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyInvitation/Details/Index.vue")
          }
        ]
      },
      // 推广订单
      {
        path: "/MyOrder",
        name: "MyOrder",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/Distribution/MyOrder/router.vue"),
        children: [
          {
            path: "/MyOrderList",
            name: "MyOrderList",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyOrder/Index.vue")
          },
          {
            path: "/MyOrderDetails/:id",
            name: "MyOrderDetails",
            component: () =>
              import(/* webpackChunkName: "public" */ "@/views/Distribution/MyOrder/Details/Index.vue")
          }
        ]
      },
      // 邀请卡
      {
        path: "/InvitationCard",
        name: "InvitationCard",
        component: () =>
          import(/* webpackChunkName: "public" */ "@/views/InvitationCard/Index.vue")
      }
    ]
  }
];
