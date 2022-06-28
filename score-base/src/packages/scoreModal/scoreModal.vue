<template>
  <transition name='scoreModal-pop'>
    <div
      v-show='visible'
      class='scoreModal'
      :class='customClass'
      @click='handleClose'
    >
			<!-- 标题 -->
			<h3 class="modal-title">{{title}}</h3>
			<div class="modal-content">
				
			</div>
      <!-- 按钮 -->
			<div class="modal-buttonList">
				<button>关闭</button>
				<button>提交</button>
			</div>
    </div>
  </transition>
</template>

<script>
import {isMobile} from './utils';
export default {
  name: 'scoreModal',
  props: {
		title: String, // 提示信息内容
    message: String, // 提示信息内容
    className: {
      // 样式名
      type: String,
      default: ''
    },
    position: {
      // 位置：top、middle、bottom
      type: String,
      default: 'bottom'
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
      visible: false,
			isMobile: isMobile(),// 是否手机端
    }
  },
  computed: {
    // 获取样式
    customClass () {
      const classes = []
      classes.push('scoreModal-' + this.type);	
			this.isMobile? classes.push('modalMobile'):classes.push('modalWeb')
      switch (this.position) {
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
.scoreModal {
	background-color: #fff;
	box-shadow: 0 0 8px rgba(0,0,0,0.3);
  position: fixed;
  box-sizing: border-box;
  min-width: 250px;
  max-width: 50%;
  max-height: 85%;
  margin-top: 0;
  padding: 15px;
  border-radius: 4px;
  color: #333;
  text-align: center;
  overflow-y: auto;
  z-index: 2000;

}
.scoreModal.modalWeb{
	width: 350px;
}
.is-placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

.modalMobile.is-placemiddle,.modalWeb.is-placemiddle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modalWeb.is-placebottom {
  bottom: 50px;
  right: 50px;
}

.modal-title{
	text-align: left;
	margin:0 5px 10px 5px;
	font-size: 16px;
}
.modal-buttonList{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	button{
		flex:1;
		height: 44px;
		text-align: center;
		outline: none;
		border-radius: 2px;
		&:first-child{
			margin-right: 15px;
			border:1px solid brown;
			background-color: #fff;	
			color:brown;
		}
		&:last-child{
			border:1px solid brown;
			background-color: brown;	
			color:#fff;
		}
	}
}
.is-placetop.scoreModal-pop-enter-active,
.is-placetop.scoreModal-pop-leave-active,
.is-placemiddle.scoreModal-pop-enter-active,
.is-placemiddle.scoreModal-pop-leave-active {
  transition: opacity 0.3s linear, margin-top 0.3s ease;
}

.is-placetop.scoreModal-pop-enter,
.is-placetop.scoreModal-pop-leave-to,
.is-placemiddle.alert-pop-enter,
.is-placemiddle.alert-pop-leave-to {
  margin-top: 30px;
  opacity: 0;
}
.is-placebottom.scoreModal-pop-enter-active,
.is-placebottom.scoreModal-pop-leave-active {
  transition: opacity 0.3s linear, margin-bottom 0.3s ease;
}

.is-placebottom.scoreModal-pop-enter,
.is-placebottom.scoreModal-pop-leave-to {
  margin-bottom: -30px;
  opacity: 0;
}
</style>
