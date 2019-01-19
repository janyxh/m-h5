<template>
  <!-- 佣金小图标 -->
  <img class="pic-commission" @click="openShare" src="@/assets/images/distribution/goods/pic-commission.png" alt>
</template>

<script>
import wx from "wx";
export default {
  mounted() {
    this.moveanyway();
  },
  methods: {
    moveanyway() {
      // 获取被拖动的元素节点
      var dom = document.querySelector(".pic-commission");

      // 文档高度
      const docW =
        document.documentElement.clientWidth || document.body.clientWidth;
      const docH =
        document.documentElement.clientHeight || document.body.clientHeight;

      // 被拖动元素宽高的一半
      const halfW = Number(this.offsetWidth) / 2;
      const halfH = Number(this.offsetHeight) / 2;

      // 靠边的间距
      const marginspacing = 10;
      dom.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault();
          e.stopPropagation();
          var touches = e.touches[0];
          // 坐标
          let oW = touches.clientX;
          let oH = touches.clientY;
          // 边界
          let L = docW - oW > halfW + marginspacing;
          let T = docH - oH > halfH + marginspacing;
          if (L) {
            this.style.left = `${oW - halfW}px`;
          } else {
            this.style.left = `${docW - this.offsetWidth - marginspacing}px`;
          }
          if (T) {
            this.style.top = `${oH - halfH / 2}px`;
          } else {
            this.style.top = `${docH - this.offsetHeight - marginspacing}px`;
          }

          if (oW - halfW <= marginspacing) {
            this.style.left = `${marginspacing}px`;
          }
          if (oH - halfH <= marginspacing) {
            this.style.top = `${marginspacing}px`;
          }
          if (this.style.left) {
            this.style.bottom = `auto`;
            this.style.right = `auto`;
          }
        },
        false
      );
    },
    openShare() {
      console.log("点击");
      wx.miniProgram.navigateTo({
        url: "../share/share"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.pic-commission {
  width: 3rem;
  height: auto;
  position: fixed;
  bottom: 4rem;
  right: 1rem;
}
</style>
