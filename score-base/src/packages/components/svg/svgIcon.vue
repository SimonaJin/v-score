<template>
  <!-- 如果iconClass是带协议的图标链接 则通过style属性方式渲染-->
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!-- 
			SVG中的use元素可以调用其他SVG文件的元素，<use xlink:href="#symbolId"></use>
    -->
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { isExternal } from "@utils/utils";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      default: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    isExt() {
			return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : "svg-icon";
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
