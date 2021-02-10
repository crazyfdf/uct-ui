<template>
  <!-- 选择框 -->
  <view class='form-radio'
        v-show="!item.options.hidden">
    <!-- 单选框 -->
    <radio-group @change="radioChange"
                 v-if="item.type=='radio'"
                 class="uct-check">
      <label class="uni-list-cell uni-list-cell-pd x-js mr20"
             v-for="(item1, index1) in item.options.options"
             :key="item1.value">
        <view>
          <radio :value="item1.value"
                 :checked="index1 == value" />
        </view>
        <view>{{item1.label}}</view>
      </label>
      <input v-model="value"
             :name="item.model"
             style="display:none" />
    </radio-group>
    <!-- 多选框 -->
    <checkbox-group @change="checkboxChange"
                    v-else-if="item.type=='checkbox'"
                    class="uct-check">
      <label class="uni-list-cell uni-list-cell-pd x-js mr20"
             v-for="(item1, index1) in item.options.options"
             :key="item1.value">
        <view>
          <checkbox :value="item1.value"
                    :checked="index1 == value" />
        </view>
        <view>{{item1.label}}</view>
      </label>
      <input v-model="value"
             :name="item.model"
             style="display:none" />
    </checkbox-group>
  </view>
</template>

<script>
export default {
  behaviors: ["uni://form-field"],
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    radioChange: function (e) {
      for (let i = 0; i < this.item.options.options.length; i++) {
        if (this.item.options.options[i].value === e.target.value) {
          this.value = i;
          break;
        }
      }
    },
    checkboxChange: function (e) {
      var items = this.item.options.options,
        values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i];
        if (values.includes(item.value)) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.uct-check {
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background-color: transparent;
}
</style>