<template>
  <div class="form-filter">
    <a class="active" @click="$emit('onSelect')">全部</a>
    <a @click="$emit('onSelect',0)">长期有效</a>
    <a @click="$emit('onSelect',1)">即将失效</a>
    <a @click="$emit('onSelect',2)">失效客户</a>
  </div>
</template>

<script>
export default {
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
  }
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/css/color";

.form-filter {
  display: flex;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid $mop-bg;

  a {
    flex: 1;
    text-align: center;
    padding: 1.4rem 0;
    color: $mop-text-gray;
    position: relative;
    transition: 200ms;

    i {
      font-size: 1.2rem;
    }
  }

  a.active {
    color: $mop-primary;
  }

  a.active::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-width: 0.4rem;
    border-style: solid;
    border-color: transparent transparent $mop-primary transparent;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
