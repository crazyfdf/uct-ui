<template>
  <view>
    <!-- 标题 -->
    <view v-if="item.type=='text'"
          class="text f16 f900 mb40">{{item.label}}</view>
    <!-- 输入框 -->
    <view v-if="item.type=='input'||'textarea'||'number'">
      <form-input :item="item"
                  v-model="value"></form-input>
    </view>
    <!-- 选择器 -->
    <view v-if="item.type=='cascader'||'select'||'time'||'date'">
      <form-select :item="item"
                   v-model="value"
                   @mapData="mapData"></form-select>
    </view>

    <!-- 选择框 -->
    <view v-if="item.type=='radio'||'checkbox'">
      <form-check :item="item"
                  v-model="value"></form-check>
    </view>
    <!-- 图片 -->
    <view v-if="item.type=='uploadImg'"
          v-show="!item.options.hidden">
      <view class="title"
            :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
      <robby-image-upload v-model="img"
                          :limit="item.options.limit"
                          :header="header"
                          @delete="deleteImage"
                          @add="addImage"
                          :showUploadProgress="true"
                          :server-url="item.options.action"></robby-image-upload>
    </view>

    <!-- 开关 -->
    <view v-if="item.type=='switch'">
      <form-switch :item="item"
                   v-model="value"></form-switch>
    </view>

    <!-- 警告提示 -->
    <view v-if="item.type=='alert'">
      <form-alert :item="item"
                  v-model="value"></form-alert>
    </view>

    <!-- 分割线 -->
    <view v-if="item.type=='divider'">
      <form-divider :item="item"
                    v-model="value"></form-divider>
    </view>
  </view>
</template>

<script>
import FormAlert from './form-item-template/form-alert.vue';
import FormDivider from './form-item-template/form-divider.vue';
import FormInput from './form-item-template/form-input.vue';
import FormSelect from './form-item-template/form-select.vue';
import FormSwitch from './form-item-template/form-switch.vue';
import FormUploadImg from './form-item-template/form-uploadImg.vue';
import RobbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
import FormCheck from './form-item-template/form-check.vue';

export default {
  components: {
    FormInput,
    FormSwitch,
    FormDivider,
    FormUploadImg,
    FormSelect,
    FormAlert,
    RobbyImageUpload,
    FormCheck,
  },
  behaviors: ['uni://form-field'],
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
      imglist: {},
      header: {
        token: uni.getStorageSync('token')
      },
    };
  },
  created () {
    if (this.item.type == 'uploadImg')
    {
      this.img = this.value
    }
  },
  computed: {
    img: {
      set (v) {
        if (this.item.type == 'uploadImg')
        {
          this.imglist[this.name] = v
          this.$emit('upImage', this.imglist)
          // this.$emit('input', this.imglist)
        }
      },
      get () {
        return this.value
      }
    },
  },
  /*   watch: {
      value (val) {
        console.log(val);
      }
    }, */
  methods: {
    deleteImage: function (e) {
    },
    addImage: function (e) {
    },
    mapData (content) {
      this.$emit('mapData', content)
    }
  }
};
</script>

<style scoped lang="scss">
</style>
