<template>
  <view class='form-select'>
    <!-- 选择器 -->
    <view v-show="!item.options.hidden">
      <!-- 日期选择器 -->
      <view v-if="item.type=='date'&&item.options.showTime==false"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <picker :mode="item.type"
                v-model="value"
                :disabled="item.options.disabled"
                @change="bindChange"
                class="input">
          <view>{{value?value:item.options.placeholder}}</view>
        </picker>
      </view>
      <!-- 日期+时间选择器 -->
      <view v-if="item.type=='date'&&item.options.showTime==true"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <w-picker :visible.sync="visible"
                  mode="date"
                  :value="value"
                  :current="true"
                  fields="minute"
                  @confirm="bindDatechange($event)"
                  :disabled-after="false"
                  ref="date">
        </w-picker>
        <view class="input"
              @tap="visible=true">{{value?value:item.options.placeholder}}</view>
      </view>
      <!-- 时间选择器 -->
      <view v-if="item.type=='time'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <picker :mode="item.type"
                v-model="value"
                :disabled="item.options.disabled"
                @change="bindChange"
                class="input">
          <view>{{value?value:item.options.placeholder}}</view>
        </picker>
      </view>
      <!-- 自定义选择器 -->
      <view v-if="item.type=='select'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <picker :value="item.options.options.value"
                :range="select"
                :disabled="item.options.disabled"
                @change="bindChange"
                class="input">
          <view>{{select[value]?select[value]:item.options.placeholder}}</view>
        </picker>
      </view>
      <!-- 地区选择器 -->
      <view v-if="item.type=='cascader'&&item.options.showSearch==false"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <picker :value="value"
                mode="region"
                :disabled="item.options.disabled"
                @change="bindChangeCity"
                class="input">
          <view>{{value?value:item.options.placeholder}}</view>
        </picker>
      </view>
      <!-- 打开地图选择具体地址 -->
      <view v-if="item.type=='cascader'&&item.options.showSearch==true"
            class="form-item"
            @tap="openMap">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <view class="input">{{value?value:item.options.placeholder}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import WPicker from '@/components/w-picker/w-picker.vue'
export default {
  behaviors: ['uni://form-field'],
  components: {
    WPicker
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  data () {
    return {
      select: [],
      visible: false
    };
  },
  created () {
    if (this.item.type == 'select')
    {
      let array = this.item.options.options
      for (let index in array)
      {
        if (array[index].value == this.value)
        {
          this.value = index
        }
        this.select.push(array[index].label)
      }
    }
    if (this.item.type == 'cascader' && this.item.options.showSearch == false)
    {
      this.value = this.value ? this.value : []
    }
    if (this.item.type == 'cascader' && this.item.options.showSearch == true)
    {
      this.$Bus.$on('updateData', content => {
        content['model'] = this.item.model
        this.value = content.address
        this.$emit('mapData', content)
      })
      this.value = this.value ? this.value : ''
    }
  },
  watch: {
    value (val) {
      if (this.item.type == 'select')
      {
        this.$emit('input', this.item.options.options[this.value].value)
      }
      else
      {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    bindDatechange (e) {
      this.value = e.value
    },
    bindChange: function (e) {
      this.value = e.target.value
    },
    bindChangeCity: function (evt) {
      this.value = evt.target.value.join(',')
    },
    // 打开地图
    openMap () {
      this.$tools.routerTo('/pages/public/map')
    },
  },
};
</script>

<style scoped lang="scss">
</style>