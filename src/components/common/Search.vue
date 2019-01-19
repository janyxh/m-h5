<template>
  <!-- 
    
    文件：搜索组件

    撰写：谢梅花
    
    示例： <mop-serach @getKeyword="getKeyword"  @onSearch="handleSearch" />

    属性： @onSearch 事件  用户输入文字后，触发的事件
    
   -->
  <div class="search-wrap">
    <div class="search">
      <i class="iconfont icon-search" />
      <input type="text" v-model="keyword" :placeholder="placeholder" />
      <i v-show="isClose" @click="handleClear" class="mintui mintui-field-error icon-delete"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: ["placeholder"],
  data() {
    return {
      keyword: "",
      isClose: false
    };
  },
  watch: {
    keyword: function(val) {
      this.handleWatch(val, "isClose");
      this.$emit("getKeyword", val);
    }
  },
  mounted() {
    // alert(this.placeholder);
    document.onkeydown = event => {
      var e = event || window.event;
      if (e && e.keyCode == 13) {
        alert("回车");
        this.$emit("onSearch");
      }
    };
  },
  methods: {
    // 监听变动赋值
    handleWatch(val, isX) {
      if (val.trim().length > 0) {
        this[isX] = true;
      } else {
        this[isX] = false;
      }
    },
    // 清除
    handleClear() {
      this.keyword = "";
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/color";

.search-wrap {
  padding: 1rem 2rem;
  background: #ffffff;

  .search {
    height: 3.6rem;
    background: $mop-bg-light;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      padding: 0 3rem;
      border: 0;
      box-sizing: border-box;
    }

    i {
      position: absolute;
      color: $mop-text-gray-deep;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.2;
    }

    i.icon-search {
      left: 1rem;
      pointer-events: none;
    }

    i.icon-delete {
      right: 1rem;
    }
  }
}
</style>
