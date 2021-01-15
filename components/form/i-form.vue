<template>
  <view>
    <form @submit="formSubmit"
          @reset="formReset"
          ref="form">
      <slot></slot>
      <view v-for="(obj,key) in list"
            :key="key">
        <!-- 有外部包裹的 -->
        <i-card v-if="obj.list">
          <view v-for="(item,index) in obj.list"
                :key="index"
                :class="index!==0?'mt40':''">
            <i-form-item @mapData="mapData"
                         v-model="item.options.defaultValue"
                         :name="item.model"
                         @upImage="upImage"
                         :item="item"></i-form-item>
            <!-- 按钮 -->
            <view v-if="item.type=='button'"
                  class="form-item mt60">
              <button class="submit"
                      :formSubmit="item.options.handle"
                      :type="item.options.type"
                      :disabled="item.options.disabled"
                      :hidden="item.options.hidden">{{item.label}}</button>
            </view>
          </view>
        </i-card>
        <!-- 没有包裹的 -->
        <view class="mb40"
              v-if="!obj.list">
          <i-form-item @mapData="mapData"
                       v-model="obj.options.defaultValue"
                       :name="obj.model"
                       @upImage="upImage"
                       :item="obj"></i-form-item>
          <!-- 按钮 -->
          <view v-if="obj.type=='button'"
                class="form-item mt60">
            <button class="submit"
                    :form-type="obj.options.handle"
                    :type="obj.options.type"
                    :disabled="obj.options.disabled"
                    :hidden="obj.options.hidden">{{obj.label}}</button>
          </view>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
import ICard from '@/components/card/i-card.vue';
import IFormItem from './i-form-item.vue';
import debounce from '@/common/utils/interactive.js'

export default {
  components: {
    ICard,
    IFormItem
  },
  props: {
    more: {
      type: Object,
      default () {
        return {}
      }
    },
    form_id: {
      type: String,
      default () {
        return ''
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      imgList: {},
      list: [],
      map: {}
    };
  },
  mounted () {
    console.log(this.form_id);
    this.$api('form.form', { name: this.name, id: this.form_id }).then(res => {
      this.list = res.data.frmJson.list
    })
  },
  methods: {
    upImage (img) {
      this.imgList = Object.assign(this.imgList, img)
    },
    mapData (content) {
      let lng = `${content.model}_lng`
      let lat = `${content.model}_lat`
      let obj = {}
      obj[lng] = content.lng
      obj[lat] = content.lat
      Object.assign(this.map, obj)
      console.log(this.map);
    },
    formSubmit: function (e) {
      debounce.canDoFunction({
        key: "submit",//基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
        time: 5000,//如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
        success: () => {//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
          submit.call(this, e)
        }
      })
    },

    formReset: function (e) {
      console.log('清空数据')
    },
  }
};
function submit (e) {
  let that = this
  e.detail.value = Object.assign(e.detail.value, that.imgList, that.more, that.map)
  console.log(this, e.detail.value);
  let rules = {}
  for (let item of that.list)
  {
    if (item.rules)
    {
      for (let item1 of item.rules)
      {
        item1.name = item.model
        item1.type = item1.pattern
      }
    }
    else if (item.list)
    {
      for (let item2 of item.list)
      {
        if (item2.rules)
        {
          for (let item3 of item2.rules)
          {
            item3.name = item2.model
            item3.type = item3.pattern
          }
        }
        else { continue }
        rules = that.$rules.rules(e.detail.value, item2.rules)
        if (!rules.isOk) { break }
      }
      if (!rules.isOk)
      {
        uni.showToast({
          icon: 'none',
          title: rules.message
        })
        return false
      }
    }
    else { continue }
    rules = that.$rules.rules(e.detail.value, item.rules)
    if (!rules.isOk) { break }
  }
  if (!rules.isOk)
  {
    uni.showToast({
      icon: 'none',
      title: rules.message
    })
    return false
  }
  that.$tools.showLoading('正在提交', true, 1000)
  that.$api('form.submit', { ...e.detail.value, id: that.form_id }).then(res => {
    console.log(res);
    if (res.code == 1)
    {
      uni.showToast({
        title: '提交成功',
        duration: 1000
      });
      that.$emit('submit', e.detail.value)
    }
    else
    {
      this.$tools.showLoading(res.msg, true, 2000)
    }
  })
}
</script>

<style scoped lang="scss">
.submit {
  width: 100%;
}
</style>
