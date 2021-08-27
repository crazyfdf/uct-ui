<template>
  <view :class="{'x-js':item.options.textAlign=='left','x-jc':item.options.textAlign=='center','x-je':item.options.textAlign=='right'}"
        :style="[titleStyle]">
    {{item.label}}
  </view>
</template>

<script>
/**
 * 表单的各个部分的大标题
 * @displayName Title标题
 */
export default {
  name: "uct-title",
  props: {
    /** title的自定义样式 */
    titleStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 文字标题配置
     * @values {"type": "text",
			"label": "文字",
			"options": {"textAlign": "left",
				"hidden": false,
				"showRequiredMark": false},
			"key": "text_1619334468969"} */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>