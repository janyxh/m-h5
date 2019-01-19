<template>
  <!-- 
    
    文件：搜索组件

    撰写：谢梅花
    
    示例： <mop-dialog :visble="true"> ...内容... </mop-dialog>

    属性： 
    
        visble  是否显示弹出窗  Boolean  默认值 false

        nofooter  是否显示底部  Boolean  默认值 true

    事件：
        onCancel  取消事件  

        onOk 确定事件
    
   -->
  <div class="dialog-wrap" v-show="visble">
    <div class="dialog">
      <slot name="header">
        <div class="dialog_header">
          <slot name="title">
            <span>提示</span>
          </slot>
        </div>
      </slot>
      <div class="dialog_body" :class="{nofooter:nofooter}">
        <slot name="body">
          <span>这是一段提示信息</span>
        </slot>
      </div>
      <!-- <slot name="footer"> -->
      <div class="dialog_footer" v-if="!nofooter">
        <button type="button" @click="$emit('onCancel')">取消</button>
        <button type="submit" @click="$emit('onOk')">确定</button>
      </div>
      <!-- </slot> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["visble", "nofooter"]
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/color";

.dialog-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  padding: 4.4rem;
  background: rgba($color: #000000, $alpha: 0.3);
  z-index: 1000;

  .dialog {
    background: #ffffff;
    width: 100%;
    min-height: 20rem;
    border-radius: 3px;
    position: relative;

    .dialog_header {
      height: 4.5rem;
      line-height: 4.5rem;
      text-align: center;
      border-bottom: 1px solid $mop-bg;
      color: $mop-text;
      font-size: 1.7rem;
    }

    .dialog_body {
      padding: 2rem;
      margin-bottom: 4rem;
    }

    .dialog_body.nofooter {
      margin-bottom: 0;
    }

    .dialog_footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 4rem;
      border-top: 1px solid $mop-bg;
      display: flex;

      button {
        flex: 1;
        width: 100%;
        background: none;
        border: none;
        outline: none;
        font-size: 1.7rem;
        color: $mop-text-gray;
      }

      button:last-child {
        border-left: 1px solid $mop-bg;
        color: $mop-success;
      }
    }
  }
}
</style>
