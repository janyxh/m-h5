<template>
  <div class="form-filter">
    <a class="active" @click="$emit('onSelect', '', 'desc')">佣金</a>
    <a @click="$emit('onSelect', 'update_time', 'desc')">最新</a>
    <a @click="$emit('onSelect', ' sales_volume', 'desc')">最热</a>
    <a @click="onPrice">价格<i class="iconfont icon-sort"></i></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelect: false
    };
  },
  mounted() {
    let aA = document.querySelectorAll("a");
    let curDom = aA[0];
    aA.forEach((element, index) => {
      aA[index].onclick = function() {
        curDom.className = "";
        this.className = "active";
        curDom = this;
      };
    });
  },
  methods: {
    onPrice() {
      this.isSelect = !this.isSelect;
      this.$emit("onSelect", "amount", this.isSelect ? "esc" : "desc");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/css/color";

.form-filter {
  display: flex;
  margin: 0;
  padding: 0;

  a {
    flex: 1;
    text-align: center;
    // padding: 1.4rem 0;
    color: $mop-text-gray;

    i {
      font-size: 1.2rem;
    }
  }

  a.active {
    color: $mop-text;
  }
}
</style>
