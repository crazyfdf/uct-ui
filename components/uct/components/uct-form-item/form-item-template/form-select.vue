<template>
  <view class='form-select'
        v-show="!item.options.hidden">
    <!-- 选择器 -->
    <!-- 日期选择器 -->
    <view v-if="item.type=='date'&&item.options.showTime==false">
      <picker :mode="item.type"
              v-model="value"
              :disabled="item.options.disabled"
              @change="bindChange"
              class="uct-select">
        <view>{{html?html:item.options.placeholder}}</view>
      </picker>
    </view>
    <!-- 日期+时间选择器 -->
    <view v-if="item.type=='date'&&item.options.showTime==true">
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
            @tap="visible=true">{{html?html:item.options.placeholder}}</view>
    </view>
    <!-- 时间选择器 -->
    <picker :mode="item.type"
            v-if="item.type=='time'"
            v-model="value"
            :disabled="item.options.disabled"
            @change="bindChange"
            class="uct-select">
      <view>{{html?html:item.options.placeholder}}</view>
    </picker>
    <!-- 自定义选择器 -->
    <picker :value="item.options.options.value"
            v-if="item.type=='select'"
            :range="select"
            :disabled="item.options.disabled"
            @change="bindChange"
            class="uct-select">
      <view>{{select[html]?select[html]:item.options.placeholder}}</view>
    </picker>
    <!-- 地区选择器 -->
    <view v-if="item.type=='cascader'&&item.options.showSearch==false"
          @tap="visible=true">
      <w-picker :visible.sync="visible"
                mode="region"
                v-model="value"
                default-type="label"
                :hide-area="false"
                @confirm="bindChangeCity($event,'region')"
                @cancel="visible=false"
                ref="region"></w-picker>
      <view class="uct-select">{{html?html:item.options.placeholder}}</view>
    </view>
    <!-- 打开地图选择具体地址 -->
    <view class="uct-select"
          v-if="item.type=='cascader'&&item.options.showSearch==true"
          @tap="openMap">{{value?value:item.options.placeholder}}</view>
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
        this.$emit("input", val);
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
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background-color: transparent;
}
</style>