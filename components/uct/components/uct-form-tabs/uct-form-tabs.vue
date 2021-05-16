<template>
  <uct-scroll :tabs="tabs"
              @success="init"
              nav
              :px="0"
              v-model="tabIndex"
              @change="changeTabIndex">
    <slot v-for="(item1,index) in tabs"
          class="px40"
          :slot="index">
    </slot>
  </uct-scroll>
</template>

<script>
export default {
  name: "formTabs",
  props: {
    item: {
      type: Array,
      default: [
        {
          value: "1",
          label: "选项1",
          list: [],
        },
        {
          value: "2",
          label: "选项2",
          list: [],
        },
      ],
    },
  },
  computed: {
    tabs() {
      return this.item.map((item) => {
        return {
          name: item.label,
          url: "",
          api: "",
          more: false,
          list: item.list,
        };
      });
    },
  },
  data() {
    return {
      tabIndex: 0, //当前列表下标
    };
  },
  methods: {
    // tabbar发生改变时的回调
    changeTabIndex(v) {},
  },
};
</script>