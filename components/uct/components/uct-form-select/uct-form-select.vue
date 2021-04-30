<template>
  <view class="form-select"
        style="width:100%">
    <!-- 选择器 -->
    <!-- 时间选择器 -->
    <view class="x-sbc"
          style="width:100%"
          @tap="visible = true"
          v-if="item.type == 'time'">
      <u-picker mode="time"
                :params="params"
                v-model="visible"
                @confirm="bindTimechange">
      </u-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'">{{ html ? html : item.options.placeholder }}</view>
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 日期选择器 -->
    <view v-if="item.type == 'date' && item.options.showTime == false"
          @tap="visible = true"
          class="x-sbc"
          style="width:100%">
      <u-picker mode="time"
                :params="params"
                v-model="visible"
                @confirm="bindDatechange">
      </u-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'">{{ html ? html : item.options.placeholder }}</view>
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 日期+时间选择器 -->
    <view v-if="item.type == 'date' && item.options.showTime == true"
          class="x-sbc"
          @tap="visible = true"
          style="width:100%">
      <u-picker mode="time"
                :params="params"
                v-model="visible"
                @confirm="bindDateTimechange"></u-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'">{{
        html ? html : item.options.placeholder
      }}</view>
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 自定义选择器 -->
    <view class="x-sbc"
          @tap="visible = true"
          style="width:100%"
          v-if="item.type == 'select'">
      <view>{{ html ? html :item.options.placeholder }}</view>
      <u-picker mode="selector"
                :default-selector="[parseInt(current)]"
                v-model="visible"
                @confirm="bindChange"
                :range="item.options.options"
                range-key="label"></u-picker>
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 地区选择器 -->
    <view v-if="item.type == 'cascader'"
          @tap="visible = true"
          class="x-sbc"
          style="width:100%">
      <u-picker mode="region"
                v-model="visible"
                @confirm="bindChangeCity"></u-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'">{{
        html ? html : item.options.placeholder
      }}</view>
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 打开地图选择具体地址 -->
    <view class="uct-select x-sbc"
          style="width:100%"
          :class="html?'c-black':'c-black-7'"
          v-if="item.type == 'treeSelect'"
          @tap="openMap">{{ html ? html : item.options.placeholder }}
      <image :src="require('../../static/imgs/public/right.png')"
             style="width: 15rpx;height: 27rpx" />
    </view>

  </view>
</template>

<script>
/**
 * 表单的选择器，包括时间选择器、日期选择器、日期+时间选择器、自定义选择器、地区选择器、打开地图选择具体地址组件
 * @displayName Select选择器
 */
export default {
  props: {
    /** 选择器配置
     * @values {"type": "select",
			"label": "下拉选择器",
			"options": {"width": "100%",
				"multiple": false,
				"disabled": false,
				"clearable": false,
				"hidden": false,
				"placeholder": "请选择",
				"dynamicKey": "",
				"dynamic": false,
				"options": [{"value": "1",
						"label": "下拉框1"},
					{"value": "2",
						"label": "下拉框2"}],
				"showSearch": false},
			"model": "select_1619337065723",
			"key": "select_1619337065723",
			"help": "",
			"prefix": "",
			"suffix": "",
			"rules": [{"required": false,
					"message": "必填项"}]} */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      html: null, //显示的选择器值
      visible: false, //打开选择器
      current: 0, //自定义选择器的当前下标
      params: {}, //显示年月日时分秒
    };
  },
  computed: {
    value: {
      get() {
        return this.item.options.defaultValue;
      },
      set(val) {
        /**
         * 选择器选择事件
         * @event input 通过v-model语法糖传值，父组件使用v-model或:value
         * @property {string} val 选择器选择值
         * @params {string} val
         */
        this.$emit("input", val);
      },
    },
  },
  created() {
    // 选择器初始值
    switch (this.item.type) {
      case "select":
        let array = this.item.options.options;
        for (let index in array) {
          if (array[index].value == this.value) {
            this.value = array[index].value;
            this.html = array[index].label;
            this.current = index;
            break;
          }
        }
        break;
      case "date":
        if (this.item.options.showTime) {
          this.params = {
            //显示年月日
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
          };
        } else {
          this.params = {
            //显示年月日时分
            year: true,
            month: true,
            day: true,
          };
        }
        break;
      case "time":
        this.params = {
          //显示时分
          hour: true,
          minute: true,
        };
        break;
      case "treeSelect":
        // 地图选择地址后的回调
        this.$uct.bus.$on("updateData", (content) => {
          this.value = content;
          this.html = content.address;
        });
        break;
    }
  },
  methods: {
    bindDateTimechange(e) {
      this.html = this.value =
        e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute;
    },
    bindDatechange(e) {
      this.html = this.value = e.year + "-" + e.month + "-" + e.day;
    },
    bindTimechange(e) {
      this.html = this.value = e.hour + ":" + e.minute;
    },
    bindChange(e) {
      this.value = this.item.options.options[e[0]].value;
      this.html = this.item.options.options[e[0]].label;
      this.current = e[0];
    },
    // 选择地区回调
    bindChangeCity(e) {
      this.html = this.value =
        e.province.label + "-" + e.city.label + "-" + e.area.label;
    },
    // 打开地图
    openMap() {
      this.$uct.to("/pages/public/map");
    },
  },
};
</script>

<style scoped lang="scss">
.uct-select {
  min-height: 80rpx;
  align-items: center;
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  border: none;
  background-color: transparent;
}
</style>
