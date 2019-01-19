<template>
  <main class="user bg-gray">
    <list-view>
      <mt-cell title="头像">
        <img :src="formUser.avatarUrl" />
      </mt-cell>
      <mt-cell title="昵称" :value="formUser.nickName"></mt-cell>
    </list-view>
    <list-view>
      <router-link :to="`/EditUserName?id=${id}&userName=${formUser.name}`">
        <mt-cell title="姓名" :value="formUser.name" is-link>
        </mt-cell>
      </router-link>
      <router-link :to="`/EditPhoneNumber?id=${id}&number=${formUser.phone}`">
        <mt-cell title="手机号" :label="formUser.number" value="更换" is-link class="cell-inline info">
        </mt-cell>
      </router-link>
    </list-view>
    <div class="btn-form">
      <mt-button type="primary" class="btn-large" @click="handleSave">保存</mt-button>
    </div>
  </main>
</template>

<script>
import ListView from "@/components/common/ListView";
import { getSalesmanInfo, updateSalesmanInfo } from "@/api/distribution";
import { Toast } from "mint-ui";
export default {
  components: {
    "list-view": ListView
  },
  data() {
    return {
      id: this.$route.query.id,
      name: localStorage.getItem("name") || null,
      number: localStorage.getItem("number") || null,
      // isformNumber: true,
      formUser: {
        nickName: localStorage.getItem("nickName"),
        avatarUrl: localStorage.getItem("avatarUrl")
      }
    };
  },
  created() {
    document.title = "个人资料";
    // if (this.isformNumber) {
    this.getData();
    // }
  },
  methods: {
    // 获取分销员信息
    getData() {
      let params = {
        compId: localStorage.getItem("compId"),
        contentId: localStorage.getItem("contentId"),
        id: this.id
      };
      getSalesmanInfo(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            const data = res.data;
            for (let i in data) {
              this.$set(this.formUser, i, data[i]);
            }
            const number = this.number || this.formUser.phone;
            const first = number.slice(0, 3);
            const last = number.slice(-4);
            this.$set(this.formUser, "number", first + "***" + last);
            if (this.number) {
              this.$set(this.formUser, "phone", this.number);
            }
            const name = this.name || this.formUser.name;
            if (name) {
              this.$set(this.formUser, "name", name);
            }
          } else {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(err => console.error(err));
    },
    // 保存
    handleSave() {
      console.log(this.formUser);
      let params = {
        compId: this.formUser.compId,
        contentId: this.formUser.contentId,
        id: this.formUser.id,
        nickname: this.formUser.nickName,
        headPhotoUrl: this.formUser.avatarUrl,
        name: this.formUser.name,
        phone: this.formUser.phone
      };
      console.log("params", params);
      updateSalesmanInfo(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            Toast({
              message: message,
              iconClass: "icon icon-success"
            });
            this.$router.push("/Distribution");
          } else {
            Toast({
              message: message,
              position: "bottom",
              duration: 2000
            });
          }
        })
        .catch(err => console.error(err));
      console.log(this.formUser);
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/color";

.user {
  // 面板内最后一个cell去掉border
  .list-view {
    .mint-cell {
      padding-left: 2rem;

      img {
        border-radius: 50%;
        width: 3.4rem;
        height: 3.4rem;
      }
    }

    .mint-cell.info {
      .mint-cell-value {
        color: $mop-primary;
      }
    }

    .mint-cell:last-child {
      .mint-cell-wrapper {
        border-bottom: 0;
      }
    }

    a {
      .mint-cell:last-child {
        .mint-cell-wrapper {
          border-bottom: 1px solid $mop-bg;
        }
      }
    }

    a:last-child {
      .mint-cell:last-child {
        .mint-cell-wrapper {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
