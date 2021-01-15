<template>
  <view class='form-radio'>
    <!-- 选择框 -->
    <view v-show="!item.options.hidden">
      <!-- 单选框 -->
      <view v-if="item.type=='radio'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <radio-group @change="radioChange"
                     class="input">
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
      </view>
      <!-- 多选框 -->
      <view v-if="item.type=='checkbox'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <checkbox-group @change="checkboxChange"
                        class="input">
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
    </view>

  </view>
</template>

<script>

export default {
  behaviors: ['uni://form-field'],
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    radioChange: function (e) {
      for (let i = 0; i < this.item.options.options.length; i++)
      {
        if (this.item.options.options[i].value === e.target.value)
        {
          this.value = i;
          break;
        }
      }
    },
    checkboxChange: function (e) {
      var items = this.item.options.options, values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i)
      {
        const item = items[i]
        if (values.includes(item.value))
        {
          this.$set(item, 'checked', true)
        } else
        {
          this.$set(item, 'checked', false)
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>