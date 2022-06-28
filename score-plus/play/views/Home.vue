<template>
  <div class="home">
    home


    <modal
      @clone="onClone"
      @confirm="onConfirm"
      v-model="show"
      title="我是标题">
      啦啦啦我是自定义内容
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "../../src/packages/modal/index.vue";
export default defineComponent({
  components: { Modal },
  setup(props, context) {
    const show = ref(false);
    const onClone = () => {
      console.log("模态框点击关闭");
    };
    const onConfirm = () => {
      console.log("模态框点击确认");
    };
		return { onClone, onConfirm, show }
  },
});
</script>
