<template>
  <section>
    <div class="task">
      <hr class="hr-divider">
      <h3>任务中心</h3>
      <router-link :to="{ path:'/Goods',query:{ id: id }}">
        <div class="task-list">
          <img src="@/assets/images/distribution/goods.png">
          <mt-cell title="推广商品" label="赚佣金" is-link>
            <span>去推广</span>
          </mt-cell>
        </div>
      </router-link>
      <router-link to="/InvitationCard">
        <div class="task-list">
          <img src="@/assets/images/distribution/invite.png">
          <mt-cell title="邀请好友" label="齐推广" is-link>
            <span>去推广</span>
          </mt-cell>
        </div>
      </router-link>
      <router-link to="/">
        <div class="task-list">
          <img src="@/assets/images/distribution/manual.png">
          <mt-cell title="招募手册" label="看政策" is-link>
            <span>去推广</span>
          </mt-cell>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ["id"]
};
</script>


<style lang="scss">
@import "../../../assets/css/color";

body {
  .task {
    background: #ffffff;

    h3 {
      padding: 0 1.9rem;
      font-size: 1.5rem;
      margin: 1.8rem 0 0.4rem 0;
    }

    .task-list {
      display: flex;
      padding: 1.4rem 0 0 1.4rem;
      // align-items: center;

      img {
        width: 3.4rem;
        height: 3.4rem;
        flex: 0 0 3.4rem;
        margin-right: 1rem;
      }

      .mint-cell {
        flex: 1 1 auto;
        color: #000000;

        .mint-cell-wrapper {
          border-bottom: 1px solid $mop-bg;
          padding-left: 0;
          padding-bottom: 1.4rem;
          background-image: none;

          .mint-cell-value {
            color: $mop-primary;
            font-size: 1.1rem;
          }

          .mint-cell-label {
            color: $mop-text-gray;
          }
        }

        .mint-cell-allow-right::after {
          top: calc(50% - 0.7rem);
          border: 1px solid $mop-primary;
          border-left: 0;
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
