<template>
  <!-- 累计邀请列表 -->
  <section>
    <!-- 搜索 -->
    <mop-search @onSearch="onSearch"></mop-search>
    <!-- 列表 -->
    <ul class="invitation-list">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <li v-for="(item,index) in dataList" :key="index">
          <router-link :to="'/MyInvitationDetails/' + item.inviteId">
            <div class="wrap">
              <div class="wrap-img">
                <img :src="item.headPhotoUrl" alt="" />
              </div>
              <div class="info">
                <h4>{{item.nickName}}</h4>
                <p v-if="item.status === 1" class="grade">{{ item.levelName }}</p>
                <!-- 0 审核中、1通过、2不通过 -->
                <p v-if="item.status !== 1" class="status">审核中</p>
              </div>
              <div class="status">
                <span>{{item.createTime}}</span>
              </div>
            </div>
          </router-link>
        </li>
      </mescroll-vue>
    </ul>
    <nodata v-if="dataList.length === 0"></nodata>
  </section>
</template>

<script>
import moment from "moment";
import MescrollVue from "mescroll.js/mescroll.vue";
import Search from "@/components/common/Search.vue";
import Nodata from "@/components/common/Nodata.vue";
import { getMescrollDown, getMescrollUp } from "@/mixins/mescroll";
import { getInvitationlist } from "@/api/distribution";
export default {
  name: "goods",
  components: {
    "mop-search": Search,
    MescrollVue,
    Nodata
  },
  data() {
    return {
      keyword: "",
      mescroll: null, // mescroll实例对象
      dataList: [
        {
          compId: 0,
          contentId: 0,
          createTime: Date.now(),
          headPhotoUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/LJ3rqdmMO7pdYArP81A7g5s9BlEQuzqVIibEcYaqUZibnkrsbLgx4Meq3E1dJqwJ1Vdic7VbiaYDiaebwicyKXoaMVRg/132",
          inviteId: "168525348852465664",
          inviteIncome: 0,
          levelId: 0,
          levelName: "青铜",
          nickName: "缤纷",
          orderAmount: 0,
          orderNumber: 0,
          status: 0
        }
      ],
      salesmanId: "",
      status: 0,
      page: {
        pageNumber: 0,
        pageSize: 10
      },
      mescrollDown: getMescrollDown(this.downCallback),
      mescrollUp: getMescrollUp(this.upCallback)
    };
  },
  created() {
    document.title = "我的邀请";
    this.salesmanId = this.$route.query.id;
  },
  methods: {
    // 获取数据 type: 1 上拉刷新-加载更多  0 下拉刷新-刷新列表
    getData(type) {
      this.page.pageNumber++;
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        inviteId: this.salesmanId,
        ...this.page
      };
      getInvitationlist(params)
        .then(res => {
          console.log(res.data);
          if (res.data.items && res.data.items.length > 0) {
            let arr = res.data.items.map(item => {
              item.createTime = moment(item.createTime).format("YYYY-MM-DD");
              return item;
            });
            if (this.page.pageNumber == 1) this.dataList = [];
            if (type) {
              this.dataList = this.dataList.concat(arr);
            } else {
              this.dataList = arr;
            }
          }
          //数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.mescroll.endSuccess(res.data.items.length);
          });
        })
        .catch(err => {
          console.error(err);
          this.mescroll.endErr();
        });
    },
    // 获取状态
    getStatus(status) {
      let getStatus = "0";
      switch (status) {
        case 0:
          getStatus = "长期有效";
          break;
        case 1:
          getStatus = "关系到15天后";
          break;
        default:
          getStatus = "已失效";
      }
      return getStatus;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    //上拉回调
    upCallback() {
      console.log("进入上拉");
      this.getData(1);
    },
    downCallback() {
      console.log("进入下拉");
      this.getData(0);
    },
    // 筛选
    onSelect(status) {
      this.status = status;
      this.downCallback();
    },
    // 搜索
    onSearch() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/distribution/invitation";
</style>
