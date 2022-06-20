<template>
  <transition name='alert-pop'>
    <div
      v-show='visible'
      class='alert'
      :class='customClass'
      @click='handleClose'
    >
      <span class='text'>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'alert',
  props: {
    message: String, // 提示信息内容
    className: {
      // 样式名
      type: String,
      default: ''
    },
    position: {
      // 位置：top、middle、bottom
      type: String,
      default: 'middle'
    },
    type: {
      // 提示类型：normal、error
      type: String,
      defalut: 'normal'
    }
  },
  data () {
    return {
      // 是否显示
      visible: false
    }
  },
  computed: {
    // 获取样式
    customClass () {
      const classes = []
      classes.push('alert-' + this.type)
      switch (this.positon) {
        case 'top':
          classes.push('is-placetop')
          break
        case 'bottom':
          classes.push('is-placebottom')
          break
        default:
          classes.push('is-placemiddle')
      }
      this.className && classes.push(this.className)
      return classes
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang='scss' scoped>
.alert {
  position: fixed;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 50%;
  max-height: 85%;
  margin-top: 0;
  padding: 18px 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  overflow-y: auto;
  z-index: 2000;
  .text {
    display: block;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    word-wrap: break-word;
  }
}

.is-placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.is-placemiddle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.is-placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.is-placetop.alert-pop-enter-active,
.is-placetop.alert-pop-leave-active,
.is-placemiddle.alert-pop-enter-active,
.is-placemiddle.alert-pop-leave-active {
  transition: opacity 0.3s linear, margin-top 0.3s ease;
}

.is-placetop.alert-pop-enter,
.is-placetop.alert-pop-leave-to,
.is-placemiddle.alert-pop-enter,
.is-placemiddle.alert-pop-leave-to {
  margin-top: 30px;
  opacity: 0;
}
.is-placebottom.alert-pop-enter-active,
.is-placebottom.alert-pop-leave-active {
  transition: opacity 0.3s linear, margin-bottom 0.3s ease;
}

.is-placebottom.alert-pop-enter,
.is-placebottom.alert-pop-leave-to {
  margin-bottom: -30px;
  opacity: 0;
}
.alert-error {
  background: rgba(255, 102, 104, 0.9);
}
</style>
