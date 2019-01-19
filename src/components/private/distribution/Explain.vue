<template>
  <mop-dialog :visble="isShowExplain" :nofooter="true">
    <span slot="title">佣金说明</span>
    <div slot="body" class="explain">
      <ol>
        <li>1.待结算：消费者通过分销员购买后，相应的订单还没到结算时间（结算时间有两种方式，①交易完成结算，一般情况是以发货后7天内（含7天）给分销员结算佣金，期间发生的退款会自动扣除；②收货维权处理期结束后再结算，一般为交易结束后15天，知道不会产生售后退款或处理完售后退款后在给分销员结算佣金）</li>
        <li>2.可提现：是指符合结算条件的订单对应的佣金，扣除已结佣部分剩下的佣金。</li>
        <li>3.已结佣：已经完成提现收款的订单对应的金额。</li>
      </ol>
      <div class="close">
        <hr>
        <i class="iconfont icon-close" @click="$emit('onCancel')" />
      </div>
    </div>
  </mop-dialog>
</template>

<script>
import Dialog from "@/components/common/Dialog";
export default {
  props: ["isShowExplain"],
  components: {
    "mop-dialog": Dialog
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/color";

.explain {
  position: relative;

  ol {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      color: $mop-text-gray-deep;
      line-height: 1.8;
      margin-bottom: 1.2rem;
      font-size: 1.1rem;
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  .close {
    width: 100%;
    position: absolute;
    bottom: -7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: myclose 1s;

    hr {
      width: 1px;
      height: 4rem;
      margin: 0;
      border: none;
      background: #ffffff;
      animation: myhr 1s;
    }

    i {
      color: #ffffff;
      font-size: 2rem;
      margin-top: -0.2rem;
    }
  }

  @keyframes myhr {
    from {
      height: 0rem;
    }

    to {
      height: 4rem;
    }
  }

  @keyframes myclose {
    from {
      bottom: 0rem;
    }

    to {
      bottom: -7rem;
    }
  }
}
</style>
