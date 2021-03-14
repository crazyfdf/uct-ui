<template>
  <view>
    <!-- 按钮 -->
    <button :class="['buttonBorder',!rotate1?'dlbutton':'dlbutton_loading',disabled?'disabled':'']"
            :style="{'background':bgColor, 'color': fontColor}"
            @click="debounce($event)"
            @contact="$emit('contact', $event)"
            @error="$emit('error', $event)"
            @getphonenumber="$emit('getphonenumber', $event)"
            @getuserinfo="$emit('getuserinfo', $event)"
            @launchapp="$emit('launchapp', $event)"
            @longtap="$emit('longtap', $event)"
            @opensetting="$emit('opensetting', $event)"
            @touchcancel="$emit('touchcancel', $event)"
            @touchend="$emit('touchend', $event)"
            @touchmove="$emit('touchmove', $event)"
            @touchstart="$emit('touchstart', $event)">
      <view :class="rotate1?'rotate_loop':''">
        <text v-if="rotate1"
              class="cuIcon cuIcon-loading1"></text>
        <view v-if="!rotate1">
          <slot name="text">{{ text }}</slot>
        </view>
      </view>
    </button>
  </view>
</template>

<script>
import { debounce } from "../../libs/utils/interactive.js";

export default {
  props: {
    text: String, //显示文本
    rotate: {
      //是否启动加载
      type: [Boolean, String],
      default: false,
    },
    disabled: {
      //是否禁用
      type: [Boolean, String],
      default: false,
    },
    bgColor: {
      //按钮背景颜色
      type: String,
      default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))",
    },
    fontColor: {
      //按钮字体颜色
      type: String,
      default: "#FFFFFF",
    },
    type: {
      //按钮操作类型
      type: String,
      defalut: "",
    },
    data: {
      //数据
      type: Object,
      default() {
        return {};
      },
    },
  },
  /*   computed: {
    rotate1() {
      //处理值
      return String(this.rotate) !== "false";
    },
  }, */
  data() {
    return {
      rotate1: false,
    };
  },
  methods: {
    // @debounce(1000, true)
    btnClick(e) {
      this.$emit("click", e);
      if (this.rotate) {
        this.rotate1 = true;
        setTimeout(() => {
          this.rotate1 = false;
        }, 1000);
      }
    },
    debounce(e) {
      debounce.canDoFunction({
        key: "submit", //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
        time: 5000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
        success: () => {
          //成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
          this.btnClick.call(this, e);
        },
      });
    },
  },
};
</script>

<style>
@import url("./css/icon.css");

button {
  outline: none; /* 或者 outline: 0 */
}
button:after {
  border: none;
}
button:focus {
  outline: none; /* 或者 outline: 0 */
}
.disabled {
  position: relative;
  opacity: 0.4;
  z-index: -999;
}
.dlbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 36rpx;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  height: 100rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  /* box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.4); */
  border-radius: 2.5rem;
  margin-top: 0rpx;
}
.dlbutton_loading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
  /* box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.4); */
  border-radius: 2.5rem;
  margin-top: 0rpx;
}
.buttonBorder {
  border: none;
  border-radius: 2.5rem;
  /* -webkit-box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 60rpx 0 rgba(0, 0, 0, 0.2); */
  -webkit-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -moz-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -ms-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  -o-transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
  transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
}

/* 旋转动画 */
.rotate_loop {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
