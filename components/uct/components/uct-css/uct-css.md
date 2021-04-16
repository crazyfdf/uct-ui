<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-14 17:20:51
 * @LastEditTime: 2021-04-16 15:32:55
 * @Description: 
-->
**注意**:UCT为了更好编写css，使用了scss预处理器，使用uct之前，请确认您的Hbuilder X已经安装了scss预处理器，一般情况下，相信您已经安装了。如果没有安装， 请在 Hbuilder X->工具->插件安装 中找到找到"scss/sass编译"安装即可，安装完毕如果不生效，请重启Hbuilder X。



##   Color 色彩

>UCT得出一套专有的调色板，在各个组件内部，使用统一的配色，为您的产品带来统一又鲜明的视觉效果。


### 平台差异说明

| App | H5 | 微信小程序 |
| --- | --- | --- |
| √ | √ | √ |


### 主色

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这些变量，如下：

~~~
/* 变量的定义，该部分UCT已全局引入，无需您编写 */

$uct-black: black;

$uct-white:#fff;

$uct-gray: #bbbbbb;

$uct-dark: #777777;

$uct-blue: #1464C7;

$uct-skyblue: #4E92E7;

$uct-green: #01b601;

$uct-red: #FF0000;

$uct-orange: #F79347;

$uct-yellow:#FFBF2B;


/* 在您编写css的地方使用这些变量 */
.title {
	color: $uct-yellow;
	......
}

~~~

### 文字颜色、背景颜色、边框颜色

推荐：UCT已通过`scss`生成了css样式，可直接在标题内使用class：

~~~
/* 字体红色 */

  <view class="c-red"></view>

/* 背景红色 */

  <view class="bc-red"></view>

/* 边框红色 */

  <view class="bs-1-red"></view>
~~~

或者：
~~~


/* 在您编写css的地方使用这些变量 */
.title {
    color:$uct-yellow;
    background-color:$uct-yellow;
    border:$uct-yellow;
}

~~~

##   偏移间距

>UCT对间距做了规范，在各个组件内部，使用间距，为您的产品带来整齐统一的视觉效果。

### 平台差异说明

| App | H5 | 微信小程序 |
| --- | --- | --- |
| √ | √ | √ |
~~~
/* 自定义偏移变量   */

$spaceTypes: (m: margin, p: padding);

$spaceDirections: (t: top, r: right, b: bottom, l: left);

$spaceSizes: (

2: 2rpx,

4: 4rpx,

8: 8rpx,

10: 10rpx,

15: 15rpx,

20: 20rpx,

24: 24rpx,

30: 30rpx,

40:40rpx,

50:50rpx,

60:60rpx,

70:70rpx,

80:80rpx,

100:100rpx,

140:140rpx);
~~~

##   font字体

>UCT对字体的型号与字重做了规范。

### 平台差异说明

| App | H5 | 微信小程序 |
| --- | --- | --- |
| √ | √ | √ |
全局：
苹方字体 14px 默认字重 
```
page {
    font-family: pingFang !important;  
    font-size: 14px;
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
}
```

字重：
f500
正常-500，一般-700，重要-900
```
/\* 字重 \*/
.f700 {
    font-weight: 700;
}
.f900 {
    font-weight: 900;
}
```
字体大小：
8px-36px
```
// /\* 字体模型 \*/

// f12 font-size:12px;

@for $i from 8 to 36 {
.f#{$i} {
    font-size: $i*1px;
  }
}
```

##  CSS使用方法
``` vue
<view class="f32 f900">color：</view>
<view class="uct-black">uct-black</view>
<view class="uct-white">uct-white</view>
<view class="uct-gray">uct-gray</view>
<view class="uct-dark">uct-dark</view>
<view class="uct-blue">uct-blue</view>
<view class="uct-skyblue">uct-skyblue</view>
<view class="uct-green">uct-green</view>
<view class="uct-red">uct-red</view>
<view class="uct-orange">uct-orange</view>
<view class="uct-yellow">uct-yellow</view>

<view class="f32 f900 mt40">推荐写法：</view>
<view class="f32 f900 mt40">颜色：</view>
<view class="c-red">c-red(字体红色)</view>
<view class="bc-red">bc-red(背景红色)</view>
<view class="bs-1-red ">bs-1-red(边框红色)</view>

<view class="f32 f900 mt40">间距：</view>
<view class="my10">my10(y轴偏移10rpx)</view>
<view class="py10">py10(y轴间距10rpx)</view>
<view class="mt10">mt10(向上偏移10rpx)</view>
<view class="pt10">pt10(向上间距10rpx)</view>

<view class="f32 f900 mt40">字重：</view>
<view class="f18 f500">f18 f500(18px字重500)</view>
<view class="f18 f700">f18 f700(18px字重700)</view>
<view class="f18 f900">f18 f900(18px字重900)</view>
```

```scss
.uct-black {
  background-color: $uct-black;
}
.uct-white {
  background-color: $uct-white;
}
.uct-gray {
  background-color: $uct-gray;
}
.uct-dark {
  background-color: $uct-dark;
}
.uct-blue {
  background-color: $uct-blue;
}
.uct-skyblue {
  background-color: $uct-skyblue;
}
.uct-green {
  background-color: $uct-green;
}
.uct-red {
  background-color: $uct-red;
}
.uct-orange {
  background-color: $uct-orange;
}
.uct-yellow {
  background-color: $uct-yellow;
}
```