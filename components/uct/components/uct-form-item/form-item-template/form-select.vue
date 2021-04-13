<template>
  <view class="form-select"
        v-show="!item.options.hidden">
    <!-- 选择器 -->
    <!-- 日期选择器 -->
    <view v-if="item.type == 'date' && item.options.showTime == false"
          class="x-sbc"
          style="width:100%">
      <picker :mode="item.type"
              v-model="value"
              :class="html?'c-black':'c-black-7'"
              :disabled="item.options.disabled"
              @change="bindChange"
              class="uct-select">
        <view>{{ html ? html : item.options.placeholder }}</view>
      </picker>
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 日期+时间选择器 -->
    <view v-if="item.type == 'date' && item.options.showTime == true"
          class="x-sbc"
          style="width:100%">
      <w-picker :visible.sync="visible"
                mode="date"
                :value="value"
                :current="true"
                fields="minute"
                @confirm="bindDatechange($event)"
                :disabled-after="false"
                ref="date">
      </w-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'"
            @tap="visible = true">{{
        html ? html : item.options.placeholder
      }}</view>
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 时间选择器 -->
    <view class="x-sbc"
          style="width:100%"
          v-if="item.type == 'time'">
      <picker :mode="item.type"
              v-model="value"
              :class="html?'c-black':'c-black-7'"
              :disabled="item.options.disabled"
              @change="bindChange"
              class="uct-select">
        <view>{{ html ? html : item.options.placeholder }}</view>
      </picker>
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 自定义选择器 -->
    <view class="x-sbc"
          style="width:100%"
          v-if="item.type == 'select'">
      <picker v-model="value"
              :range="select"
              :class="html||html==0?'c-black':'c-black-7'"
              :disabled="item.options.disabled"
              @change="bindChange"
              class="uct-select">
        <view>{{ select[html] ? select[html] : item.options.placeholder }}</view>
      </picker>
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 地区选择器 -->
    <view v-if="item.type == 'cascader' && item.options.showSearch == false"
          @tap="visible = true"
          class="x-sbc"
          style="width:100%">
      <w-picker :visible.sync="visible"
                mode="region"
                v-model="value"
                default-type="label"
                :hide-area="false"
                @confirm="bindChangeCity($event, 'region')"
                @cancel="visible = false"
                ref="region"></w-picker>
      <view class="uct-select"
            :class="html?'c-black':'c-black-7'">{{
        html ? html : item.options.placeholder
      }}</view>
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>
    <!-- 打开地图选择具体地址 -->
    <view class="uct-select x-sbc"
          style="width:100%"
          :class="value?'c-black':'c-black-7'"
          v-if="item.type == 'cascader' && item.options.showSearch == true"
          @tap="openMap">{{ value ? value : item.options.placeholder }}
      <image src="../../../static/imgs/public/right.png"
             style="width: 15rpx;height: 27rpx" />
    </view>

  </view>
</template>

<script>
import WPicker from "./module/w-picker/w-picker";

export default {
  components: {
    WPicker,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      html: null,
      select: [],
      visible: false,
    };
  },
  computed: {
    value: {
      get() {
        return this.item.options.defaultValue;
      },
      set(val) {
        this.html = val;
        if (this.item.type == "select") {
          this.$emit("input", this.item.options.options[val].value);
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
  created() {
    if (this.item.type == "select") {
      let array = this.item.options.options;
      for (let index in array) {
        if (array[index].value == this.value) {
          this.value = index;
        }
        this.select.push(array[index].label);
      }
    }
    if (this.item.type == "cascader" && this.item.options.showSearch == true) {
      this.$Bus.$on("updateData", (content) => {
        content["model"] = this.item.model;
        this.value = content.address;
        this.$emit("mapData", content);
      });
    }
  },
  methods: {
    bindDatechange(e) {
      this.value = e.value;
    },
    bindChange: function (e) {
      this.value = e.target.value;
    },
    bindChangeCity: function (evt) {
      this.value = evt.result;
    },
    // 打开地图
    openMap() {
      this.$tools.routerTo("/pages/public/map");
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
