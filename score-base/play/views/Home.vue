<template>
  <div class='home'>home</div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    this.$alert({
      message: '网络异常！',
      duration: 2000,
      position: 'middle',
      className: 'big'
    })
  }
}
</script>
