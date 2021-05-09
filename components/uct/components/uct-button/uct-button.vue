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
          <!-- @slot 按钮内容文本 -->
          <slot name="text">{{ text }}</slot>
        </view>
      </view>
    </button>
  </view>
</template>

<script>
/**
 * 按钮组件，主要提供加载中动画和防抖功能
 * @displayName Button按钮
 */
export default {
  name: "uct-button",
  props: {
    /** 显示文本 */
    text: { type: String, default: "" },
    /** 是否启动加载 */
    rotate: {
      type: [Boolean, String],
      default: false,
    },
    /** 是否禁用 */
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    /** 防抖及动画时间 */
    time: {
      type: Number,
      default: 1000,
    },
    /** 按钮背景颜色 */
    bgColor: {
      type: String,
      default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))",
    },
    /** 按钮字体颜色 */
    fontColor: {
      type: String,
      default: "#FFFFFF",
    },
  },
  data() {
    return {
      rotate1: false,
    };
  },
  methods: {
    btnClick(e) {
      /**
       * 点击按钮回调
       * @event click
       */
      this.$emit("click", e);
      if (this.rotate) {
        this.rotate1 = true;
        setTimeout(() => {
          this.rotate1 = false;
        }, this.time);
      }
    },
    debounce(e) {
      if (!this.rotate) {
        this.btnClick(e);
      } else {
        this.$uct.debounce(this.btnClick(e), this.time);
      }
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
