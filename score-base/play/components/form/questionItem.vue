<template>
  <div class="admin-quesForm-item">
    <div class="question-box">
      <el-input
        v-model="itemData.questionText"
        placeholder="请输入问题内容"
      ></el-input>
      <el-select
        v-model="itemData.questionType"
        placeholder="请选择"
        @change="changeQuestionType"
      >
        <el-option
          v-for="item in questionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="icon-box">
        <i
          :class="[
            'el-icon-share',
            itemData.questionShare ? 'iconShare' : '',
          ]"
          @click="jumpQuestion(itemData.questionId)"
        ></i>
        <i
          :class="[
            'el-icon-setting',
            itemData.questionSeted ? 'iconShare' : '',
          ]"
          @click="questionSetting(itemData.questionId)"
        ></i>
        <i class="el-icon-delete" @click="delQuestion(itemData.questionId)"></i>
      </div>
    </div>
    <div class="expression-box" v-if="itemData.questionType === '3'">
      <div
        class="expression-item"
        v-for="(item, index) in expressionList"
        :key="item"
      >
        <img :src="require(`../../assets/face-${index + 1}-on.png`)" alt="" />
        {{ item }}
      </div>
    </div>
    <div
      class="answer"
      v-if="itemData.questionType !== '3' && itemData.questionType !== '4'"
    >
      <div
        class="answer-item"
        v-for="(item, index) in itemData.answerList"
        :key="index"
      >
        <el-input
          v-model="itemData.answerList[index]"
          placeholder="选项"
        ></el-input>
        <i
          v-if="itemData.answerList.length > 1"
          class="el-icon-delete"
          @click="delOptions(itemData.questionId, index)"
        ></i>
      </div>
    </div>
    <div
      class="add-answer"
      v-if="itemData.questionType !== '3' && itemData.questionType !== '4'"
      @click="addAnswer(itemData.questionId)"
    >
      <i class="el-icon-plus"></i>
      新增选项
    </div>
  </div>
</template>

<script>
export default {
  name: "questionItem",
  props: {
    questionData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      itemData: {},
      answerShow: true,
      queryVal: "1",
      questionOptions: [
        {
          value: "1",
          label: "单选",
        },
        {
          value: "2",
          label: "多选",
        },
        {
          value: "3",
          label: "表情",
        },
        {
          value: "4",
          label: "文本",
        },
      ],
      expressionList: ["很不好用", "不好用", "一般", "很棒", "爱了"],
      expressionShow: false,
    };
  },
  created() {
    console.log("questionData", this.questionData);
    this.itemData = this.questionData;
  },
  watch: {
    questionData: {
      // 数据变化时执行的逻辑代码
      handler(newVal, oldVal) {
        this.itemData = newVal;
      },
      // 开启深度监听
      deep: true,
    },
  },
  methods: {
    //
    jumpQuestion(val) {
      this.$emit("jumpQuestion", val);
    },
    //
    questionSetting(val) {
      this.$emit("questionSetting", val);
    },
    // 改变问题类型
    changeQuestionType(val) {
      let value = {
        questionId: this.itemData.questionId,
        questionType: val,
      };
      this.$emit("changeQuestionType", value);
    },
    //删除问题
    delQuestion(val) {
      this.$emit("delQuestion", val);
    },
    // 新增选项
    addAnswer(val) {
      this.$emit("addOptions", val);
    },
    //删除问题选项
    delOptions(id, index) {
      let val = {
        questionId: id,
        index: index,
      };
      this.$emit("delOptions", val);
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@Ascss/_var.scss";
.admin-quesForm-item {
  .question-box {
    display: flex;
    flex-direction: row;
    > div.el-input {
      width: 60%;
    }
    > div.el-select {
      width: 90px;
      margin-left: 10px;
    }
    .icon-box {
      margin-left: 5px;
      i {
        margin-left: 5px;
        color: $menuText;
      }
			i.iconShare {
        color: $blue;
      }
    }
  }
  .answer {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .answer-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 7px;
      > div {
        width: 80%;
      }
      i {
        color: $menuText;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .expression-box {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    .expression-item {
      display: flex;
      flex-direction: column;
      width: 60px;
      font-size: 14px;
      color: $menuText;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .add-answer {
    font-size: 14px;
    color: $blue;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
