<!--空布局

可作为独立的组件, 不使用mescroll的页面也能单独引入, 以便APP全局统一管理:
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
<mescroll-empty v-if="isShowEmpty" :option="optEmpty" @emptyclick="emptyClick"></mescroll-empty>

-->
<template>
	<view
		class="mescroll-empty"
		:class="{ 'empty-fixed': option.fixed }"
		:style="{ 'z-index': option.zIndex, top: option.top }"
	>
		<view>
			<image v-if="icon" class="empty-icon" :src="icon" mode="widthFix" />
		</view>
		<view v-if="tip" class="empty-tip">{{ tip }}</view>
		<view v-if="option.btnText" class="empty-btn" @click="emptyClick">{{ option.btnText }}</view>
	</view>
</template>

<script>
/**
 * 空布局组件，当列表或者页面内容为空白时可使用，可快速实现空白页图片提示，文字提示，按钮操作功能
 * @displayName Empty空布局
 */
export default {
	name: 'uct-empty',
	props: {
		/**  empty的配置项: 默认为GlobalOption.empty
     * 列表第一页无任何数据时,显示的空布局 (需配置warpId才生效)
      warpId : 父布局的id (1.3.5版本支持传入dom元素)
      icon : 空布局的图标路径
      tip : 提示文本
      btntext : 按钮文本
      btnClick : 点击按钮的回调
      supportTap: 如果您的运行环境支持tap,则可配置true,可减少点击延时,快速响应事件;默认false,通过onclick添加点击事件; (v 1.3.0 新增) (注:微信和PC无法响应tap事件)
          * @values {warpId : null ,
        icon : null ,
        tip : "暂无相关数据~" ,
        btntext : "" ,
        btnClick : null
        supportTap : false}
     */
		option: {
			type: Object,
			default() {
				return {
					GlobalOption: {
						empty: {
							use: true, // 是否显示空布局
							icon:
								'data:image/png;base64,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', // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
							tip: '~ 空空如也 ~', // 提示
						},
					},
				};
			},
		},
	},
	// 使用computed获取配置,用于支持option的动态配置
	computed: {
		// 图标
		icon() {
			return this.option.icon == null ? this.GlobalOption.empty.icon : this.option.icon; // 此处不使用短路求值, 用于支持传空串不显示图标
		},
		// 文本提示
		tip() {
			return this.option.tip == null ? this.GlobalOption.empty.tip : this.option.tip; // 此处不使用短路求值, 用于支持传空串不显示文本提示
		},
	},
	methods: {
		// 点击按钮
		emptyClick() {
			/**
			 * 点击按钮回调
			 * @event emptyclick
			 */
			this.$emit('emptyclick');
		},
	},
};
</script>

<style>
/* 无任何数据的空布局 */
.mescroll-empty {
	box-sizing: border-box;
	width: 100%;
	padding: 100rpx 50rpx;
	text-align: center;
}

.mescroll-empty.empty-fixed {
	z-index: 99;
	position: absolute; /*transform会使fixed失效,最终会降级为absolute */
	top: 100rpx;
	left: 0;
}

.mescroll-empty .empty-icon {
	width: 280rpx;
	height: 280rpx;
}

.mescroll-empty .empty-tip {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: gray;
}

.mescroll-empty .empty-btn {
	display: inline-block;
	margin-top: 40rpx;
	min-width: 200rpx;
	padding: 18rpx;
	font-size: 28rpx;
	border: 1rpx solid #e04b28;
	border-radius: 60rpx;
	color: #e04b28;
}

.mescroll-empty .empty-btn:active {
	opacity: 0.75;
}
</style>
