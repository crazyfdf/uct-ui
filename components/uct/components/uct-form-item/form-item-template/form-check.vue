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
                 :checked="value == item1.value" />
        </view>
        <view>{{item1.label}}</view>
      </label>
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
                    :checked="value.includes(item1.value) " />
        </view>
        <view>{{item1.label}}</view>
      </label>
    </checkbox-group>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.item.options.defaultValue;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    radioChange: function (e) {
      this.item.options.options.forEach((item, index) => {
        if (item.value === e.target.value) {
          this.value = item.value;
        }
      });
    },
    checkboxChange: function (e) {
      let items = this.item.options.options,
        values = e.detail.value;
      items.forEach((item, index) => {
        if (values.includes(item.value)) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      });
      this.value = items
        .filter((item) => {
          return item.checked;
        })
        .map((item) => {
          return item.value;
        });
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