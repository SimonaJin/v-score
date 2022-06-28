<template>
  <div class="modal-wrapper">
    <h3>{{ title }}</h3>
    <slot></slot>
    <div class="modal-button">
      <button @click="onConfirm">确认</button>
      <button @click="onClone">取消</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["title"],
  setup(prop, context) {
    const methods = {
      onConfirm() {
        context.emit("confirm");
      },
      onClone() {
        context.emit("clone");
      },
    };
    return {
      ...methods,
    };
  },
});
</script>
<style scoped lang="scss">
.modal-wrapper {
  width: 300px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
