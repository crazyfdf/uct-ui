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
        <view>{{value?value:item.options.placeholder}}</view>
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
            @tap="visible=true">{{value?value:item.options.placeholder}}</view>
    </view>
    <!-- 时间选择器 -->
    <picker :mode="item.type"
            v-if="item.type=='time'"
            v-model="value"
            :disabled="item.options.disabled"
            @change="bindChange"
            class="uct-select">
      <view>{{value?value:item.options.placeholder}}</view>
    </picker>
    <!-- 自定义选择器 -->
    <picker :value="item.options.options.value"
            v-if="item.type=='select'"
            :range="select"
            :disabled="item.options.disabled"
            @change="bindChange"
            class="uct-select">
      <view>{{select[value]?select[value]:item.options.placeholder}}</view>
    </picker>
    <!-- 地区选择器 -->
    <view v-if="item.type=='cascader'&&item.options.showSearch==false"
          @tap="visible=true">
      <w-picker :visible.sync="visible"
                mode="region"
                :value="value"
                default-type="label"
                :hide-area="false"
                @confirm="bindChangeCity($event,'region')"
                @cancel="visible=false"
                ref="region"></w-picker>
      <view class="uct-select">{{value.length?value:item.options.placeholder}}</view>
    </view>
    <!-- 打开地图选择具体地址 -->
    <view class="uct-select"
          v-if="item.type=='cascader'&&item.options.showSearch==true"
          @tap="openMap">{{value?value:item.options.placeholder}}</view>
  </view>
</template>

<script>
import WPicker from "@/components/w-picker/w-picker.vue";
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
      select: [],
      visible: false,
      value: null,
    };
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
    if (this.item.type == "cascader" && this.item.options.showSearch == false) {
      console.log(this.value);
      this.value = this.value ? this.value : [];
    }
    if (this.item.type == "cascader" && this.item.options.showSearch == true) {
      this.$Bus.$on("updateData", (content) => {
        content["model"] = this.item.model;
        this.value = content.address;
        this.$emit("mapData", content);
      });
      this.value = this.value ? this.value : "";
    }
  },
  watch: {
    value(val) {
      if (this.item.type == "select") {
        this.$emit("input", this.item.options.options[this.value].value);
      } else {
        this.$emit("input", val);
      }
    },
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