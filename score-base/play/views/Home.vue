<template>
  <div class="home">home</div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.$scoreModal({
      useId: "user1233", // 用户id
      userKey: "1231238972837", // 
    });
  },
};
</script>
