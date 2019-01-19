<template>
  <div id="nodata">
    <img src="@/assets/images/distribution/nodata.png">
    暂无数据
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/css/color";

/* ------------------------------------------------------------ 暂无数据 -------------------------------------------------------------------  */
#nodata {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  color: $mop-text-gray;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 14rem;
    height: auto;
  }
}
</style>
