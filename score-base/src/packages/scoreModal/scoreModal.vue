<template>
  <transition name="scoreModal-pop">
    <div v-if="scoreShow">
      <div
        tag="div"
        class="scoreModal-iconBox"
        :style="{ backgroundColor: textColor, color: bgColor }"
        v-if="modality === 'icon' && !modalShow"
        @click="iconBoxClick"
      >
        <svg-icon icon-class="remark" color="#fffff"></svg-icon>
      </div>
      <template v-if="modality === 'dialog' || modalShow">
        <div
          class="scoreModal"
          :class="customClass"
          :style="{ color: textColor, backgroundColor: bgColor }"
        >
          <img
            src="../../assets/banner.jpeg"
            alt=""
            class="modal-banner"
            v-if="channelType === 'link'"
          />
          <div class="modal-wrapper">
            <!-- 标题 -->
            <h3 class="modal-title">{{ titleText }}</h3>
            <!-- 评分 -->
            <div class="modal-content">
              <template v-if="questionType === 'score'">
                <div class="text">{{ low_legend }}</div>
                <div class="score-content">
                  <span
                    @click="scoreClick(question_id, next_question_index)"
                    class="rask-item"
                    v-for="item in rating_list"
                    v-bind:key="item"
                    >{{ item }}</span
                  >
                </div>
                <div class="text">{{ high_legend }}</div>
              </template>
              <template v-else-if="questionType === 'radio'">
                <div class="checkbox-content">
                  <span
                    @click="scoreClick"
                    v-for="optionItem in optionList"
                    v-bind:key="optionItem"
                    :style="{ backgroundColor: textColor, color: bgColor }"
                    >{{ optionItem }}</span
                  >
                </div>
              </template>
              <template v-else-if="questionType === 'textarea'">
                <div class="textarea-content">
                  <textarea
                    maxlength="50"
                    v-model="textData"
                    :style="{ border: `1px solid ${textColor}` }"
                  ></textarea>
                  <!-- 按钮 -->
                  <div class="modal-buttonList">
                    <button
                      :style="{
                        borderColor: textColor,
                        backgroundColor: bgColor,
                        color: textColor,
                      }"
                      @click="handleClose"
                    >
                      关闭
                    </button>
                    <button
                      :style="{
                        borderColor: bgColor,
                        backgroundColor: textColor,
                      }"
                      @click="handleSubmit"
                    >
                      提交
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import { isMobile } from "@utils/utils";
import props from "./config";
import SvgIcon from "@comp/svg/svgIcon.vue";
import * as server from "../../server/index";
export default {
  name: "scoreModal",
  props: props,
  components: { SvgIcon },
  data() {
    return {
      modalShow: false,
      isMobile: isMobile(), // 是否手机端
      scoreShow: true,
      questionType: "score",
      optionList: [],
      questionId: "",
      nextQuestionIndex: 0,
      titleText: "",
      textData: "",
    };
  },
  computed: {
    // 获取样式
    customClass() {
      const classes = [];
      classes.push("scoreModal-" + this.type);
      this.questionId = this.question_id;
      this.nextQuestionIndex = this.next_question_index;
      this.titleText = this.title;
      //判断渠道
      this.isMobile && this.channelType === "web"
        ? classes.push("modalWeb")
        : classes.push("modalLink");
      //位置处理
      switch (this.location) {
        case "bottomCenter":
          classes.push("bottomCenter");
          break;
        case "bottomRight":
          classes.push("bottomRight");
          break;
        case "bottomLeft":
          classes.push("bottomLeft");
          break;
        case "bottomTile":
          classes.push("bottomTile");
          break;
        case "Rightbottom":
          classes.push("Rightbottom");
          break;
        case "Rightbottom":
          classes.push("Rightbottom");
          break;
        case "pageCenter":
          classes.push("pageCenter");
          break;
        default:
          classes.push("bottomRight");
      }
      this.className && classes.push(this.className);
      return classes;
    },
  },
  methods: {
    // 图标
    iconBoxClick() {
      this.modalShow = true;
      this.IconmodalShow = false;
    },
    async getQuestion(nextQuestionIndex, questionId) {
      let parmData = {
        next_question_index: this.nextQuestionIndex,
        question_id: this.questionId,
      };
      try {
        let result = await server.getQuestion(parmData);
        return result.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    //评分点击
    async scoreClick(nextQuestionIndex, questionId) {
      this.getQuestion(nextQuestionIndex, questionId)
        .then((res) => {
          let {
            questionType,
            question_count,
            next_question_index,
            question_id,
            title,
          } = res;
          this.questionType = questionType;
          this.optionList = question_count;
          this.questionId = question_id;
          this.titleText = title;
          this.nextQuestionIndex = next_question_index;
        })
        .catch((err) => {});
    },
    //关闭
    handleClose() {
      localStorage.setItem("vscoreTime:", new Date());
      this.scoreShow = false;
    },
    //提交
    async handleSubmit() {
      let parmData = {
        question_id: this.questionId,
        textData: this.textData,
      };
      try {
        let result = await server.getScoreSubmit(parmData);
        this.scoreShow = false;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 320px;
  resize: none;
}
//---- icon形式
.scoreModal-iconBox {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 160px;
	position: absolute;
	right: 2%;
	bottom: 20px;
}
.scoreModal {
  box-sizing: border-box;
  color: #333;
  text-align: center;
  overflow-y: auto;
  width: 100%;
}
.modal-content {
  display: flex;
  align-items: center;
  width: 100%;
  .text {
    font-size: 14px;
  }
  .score-content {
    display: flex;
    .rask-item {
      font-size: 16px;
      padding: 0 8px;
      line-height: 2;
      border-width: 1px;
      border-style: solid;
      margin: 0 10px;
    }
  }
}

.checkbox-content {
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 24px;
  span {
    line-height: 100px;
    padding: 16px;
    flex: 1;
  }
}
.textarea-content {
  width: 100%;
}
//--------------- web
.scoreModal.modalWeb {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  position: fixed;
  z-index: 2000;
  padding: 20px 40px 40px 40px;
  overflow: hidden;
  width: 88%;
  .modal-wrapper {
    overflow: hidden;
    display: inline-block;
    width: 100%;
    h3 {
      font-size: 18px;
      line-height: 2;
    }
  }
}
//------------- link
.scoreModal.modalLink {
  .modal-banner {
    width: 100%;
    height: 100%;
    display: block;
  }
  .modal-wrapper {
    width: 1200px;
    margin: 20px auto;
    h3 {
      font-size: 20px;
    }
  }
}
//按钮
.modal-buttonList {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  button {
    flex: 1;
    height: 180px;
    text-align: center;
    outline: none;
    border-radius: 2px;
    &:first-child {
      margin-right: 15px;
      border: 1px solid brown;
      background-color: #fff;
      color: brown;
    }
    &:last-child {
      border: 1px solid brown;
      background-color: brown;
      color: #fff;
    }
  }
}
//位置
.modalWeb.bottomCenter {
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -30%);
}
.modalWeb.bottomRight {
  right: 0px;
  bottom: 0px;
  transform: translate(-3%, -17%);
}
.modalWeb.bottomLeft {
  left: 0px;
  bottom: 0px;
  transform: translate(3%, -17%);
}
.modalWeb.bottomTile {
  left: 0px;
  bottom: 0px;
  width: 100%;
}
.modalWeb.pageCenter {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modalWeb.is-placebottom {
  bottom: 50px;
  right: 50px;
}

.modal-title {
  text-align: left;
  margin: 0 5px 10px 5px;
  font-size: 16px;
}

//----动画
.is-placetop.scoreModal-pop-enter-active,
.is-placetop.scoreModal-pop-leave-active,
.pageCenter.scoreModal-pop-enter-active,
.pageCenter.scoreModal-pop-leave-active {
  transition: opacity 0.3s linear, margin-top 0.3s ease;
}
.is-placetop.scoreModal-pop-enter,
.is-placetop.scoreModal-pop-leave-to,
.pageCenter.alert-pop-enter,
.pageCenter.alert-pop-leave-to {
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
