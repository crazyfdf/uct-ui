<template>
  <view class="wrap">
    <tools v-show="current == 0"></tools>
    <components v-show="current == 1"></components>
    <templates v-show="current == 2"></templates>
    <u-tabbar :list="tabbarConfig"
              v-model="current"
              :mid-button="true"></u-tabbar>
  </view>
</template>

<script>
import tools from "@/pages/index/tools.vue";
import components from "@/pages/index/components.vue";
import templates from "@/pages/index/templates.vue";
export default {
  components: {
    components,
    tools,
    templates,
  },
  data() {
    return {
      current: 1,
      tabbarConfig: [
        {
          iconPath: "/static/imgs/tabbar/js.png",
          selectedIconPath: "/static/imgs/tabbar/js_select.png",
          text: "工具",
        },
        {
          iconPath: "/static/imgs/tabbar/component.png",
          selectedIconPath: "/static/imgs/tabbar/component_select.png",
          text: "组件",
          midButton: true,
        },
        {
          iconPath: "/static/imgs/tabbar/template.png",
          selectedIconPath: "/static/imgs/tabbar/template_select.png",
          text: "模板",
        },
      ],
    };
  },
  mounted() {
    this.current = this.$Route.query.current ? this.$Route.query.current : 1;
  },
};
</script>
