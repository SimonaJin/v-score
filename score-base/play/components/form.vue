<template>
  <div class="admin-questionnaireForm-wrapper">
    <h5>新建问卷</h5>
    <div class="admin-quesForm-content">
      <el-form
        :model="questionForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <formcontent title="一、发放渠道设置">
          <template #questionItem>
            <el-radio-group v-model="questionForm.channel">
              <el-radio
                :label="item.label"
                v-for="item in channelList"
                :key="item.name"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </template>
        </formcontent>
        <formcontent title="二、问卷外观设置">
          <template #questionItem>
            <el-form-item label="问卷形式">
              <el-radio-group v-model="questionForm.type">
                <el-radio
                  :label="item.label"
                  v-for="item in typeList"
                  :key="item.name"
                  >{{ item.name }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="显示位置">
              <el-select v-model="questionForm.position" placeholder="请选择">
                <el-option
                  v-for="item in positionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色配置">
              <div class="color-box">
                <div class="color-box-item">
                  <el-color-picker
                    v-model="questionForm.mainColor"
                  ></el-color-picker>
                  <span>主色调</span>
                </div>
                <div class="color-box-item">
                  <el-color-picker
                    v-model="questionForm.textColor"
                  ></el-color-picker>
                  <span>文字颜色</span>
                </div>
                <div class="color-box-item">
                  <el-color-picker
                    v-model="questionForm.bgColor"
                  ></el-color-picker>
                  <span>背景颜色</span>
                </div>
              </div>
            </el-form-item>
          </template>
        </formcontent>
        <formcontent title="三、问卷内容设置">
          <template #questionItem>
            <el-row>
              <el-form-item label="NPS问题">
                <div class="question-box">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="questionForm.questionText"
                  >
                  </el-input>
                  <div class="icon-box">
                    <i
                      :class="[
                        'el-icon-share',
                        questionForm.questionShare ? 'iconShare' : '',
                      ]"
                      @click="jumpFirstQuestion"
                    ></i>
                    <i
                      :class="[
                        'el-icon-setting',
                        questionForm.questionSeted ? 'iconShare' : '',
                      ]"
                      @click="questionFirstSetting"
                    ></i>
                  </div>
                  <el-button
                    size="mini"
                    type="info"
                    plain
                    @click="
                      () => {
                        questionForm.questionText =
                          '你有多大可能性将我们推荐给朋友？';
                      }
                    "
                    >重制为默认问题</el-button
                  >
                </div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="更多问题">
                <question-item
                  :questionData="item"
                  v-for="(item, index) in questionForm.questionList"
                  :key="item.questionId"
                  @delQuestion="delQuestion"
                  @delOptions="delOptions"
                  @addOptions="addOptions"
                  @changeQuestionType="changeQuestionType"
                  @jumpQuestion="jumpQuestion"
                  @questionSetting="questionSetting"
                ></question-item>
              </el-form-item>
            </el-row>
            <el-row>
              <div class="addquestion" @click="addquestion">
                <i class="el-icon-plus"></i>
                新增问题
              </div>
            </el-row>
          </template>
        </formcontent>
        <formcontent title="选择显示方式">
          <template #questionItem>
            <el-form-item label="显示频率（同设备）">
              多久显示一次问卷
              <div class="row-item">
                <el-input
                  v-model="questionForm.frequency"
                  placeholder="1"
                  class="formInput"
                ></el-input>
                <el-select
                  v-model="questionForm.timeValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </template>
        </formcontent>
        <formcontent title="">
          <template #questionItem>
            <div class="title-box">
              <h3>让我们开始吧</h3>
              <p>
                点击"开启"按钮，将埋点代码给研发工程师。当代码被嵌入网页后，问卷就会生效。
              </p>
              <el-button type="primary">开启</el-button>
            </div>
          </template>
        </formcontent>
      </el-form>
    </div>
    <!-- 首次问题设置 -->
    <dialog-box
      :dialog-visible="showDialog"
      :title="dialogTitle"
      @dialogCancel="showDialog = false"
      @dialogSubmit="dialogSubmit"
    >
      <template #dialogContent>
        <p>描述语修改</p>
        <el-row class="dialogItem">
          <el-input
            v-model="questionForm.setText1"
            class="dialogInput"
          ></el-input>
          <el-input
            v-model="questionForm.setText2"
            class="dialogInput"
          ></el-input>
        </el-row>
      </template>
    </dialog-box>
    <!-- 其余问题设置 -->
    <dialog-box
      :dialog-visible="showOptionsDialog"
      :title="dialogTitle"
      @dialogCancel="showOptionsDialog = false"
      @dialogSubmit="dialogOptionSubmit"
    >
      <template #dialogContent>
        <template
          v-if="
            questionForm.questionList[questionId] &&
            questionForm.questionList[questionId].questionType === '4'
          "
        >
          <el-row style="margin-bottom: 15px">
            <el-checkbox
              v-if="questionForm.questionList[questionId]"
              v-model="questionForm.questionList[questionId].setData.describe"
              >题目描述</el-checkbox
            >
          </el-row>
          <el-row
            style="margin-bottom: 15px"
            v-if="
              questionForm.questionList[questionId].setData &&
              questionForm.questionList[questionId].setData.describe
            "
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="questionForm.questionList[questionId].description"
            >
            </el-input>
          </el-row>
          <el-row>
            <el-checkbox
              v-if="questionForm.questionList[questionId]"
              v-model="questionForm.questionList[questionId].setData.required"
              >是否必填</el-checkbox
            >
          </el-row>
        </template>
        <el-row v-else>
          <el-checkbox
            v-if="questionForm.questionList[questionId]"
            v-model="questionForm.questionList[questionId].setData.order"
            >开启“选项展示顺序随机”</el-checkbox
          >
        </el-row>
      </template>
    </dialog-box>
    <!-- 首次条件 -->
    <dialog-box
      :dialog-visible="showConditionFrist"
      :title="dialogTitle"
      @dialogCancel="showConditionFrist = false"
      @dialogSubmit="dialogConditionSubmit"
      class="dialog-comp"
    >
      <template #dialogContent>
        <div class="dialog-condition-box">
          <div
            class="dialog-condition-item"
            v-for="(condition, index) in conditionList"
            :key="condition.minNum"
          >
            如评分是
            <el-select
              v-model="condition.minNum"
              placeholder="请选择"
              class="conditionSelect"
            >
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            到
            <el-select
              v-model="condition.maxNum"
              placeholder="请选择"
              class="conditionSelect"
            >
              <el-option
                v-for="item in conditionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            ，那么跳转到题目
            <el-select v-model="condition.chooseQuestion" placeholder="请选择">
              <el-option
                v-for="item in questionForm.questionList"
                :key="item.questionId"
                :label="item.questionText"
                :value="item.questionId"
              >
              </el-option>
            </el-select>
            <i
              class="el-icon-remove"
              @click="removeCondition(index, conditionList)"
            ></i>
          </div>
        </div>
        <div class="addquestion" @click="addCondition">
          <i class="el-icon-plus"></i>新增条件
        </div>
      </template>
    </dialog-box>
    <!-- 选项条件 -->
    <dialog-box
      :dialog-visible="showCondition"
      :title="dialogTitle"
      @dialogCancel="dialogOptionsCancel"
      @dialogSubmit="dialogShareubmit"
      class="dialog-comp"
    >
      <template #dialogContent>
        <div class="dialog-condition-box">
          <template
            v-if="
              questionForm.questionList[questionId] &&
              questionForm.questionList[questionId].questionType != '4'
            "
          >
            <div
              class="dialog-condition-item"
              v-for="(condition, index) in conditionData"
              :key="condition.selectData"
            >
              如选择
              <el-select
                v-model="condition.selectData"
                placeholder="请选择"
                class="conditionSelect"
              >
                <el-option
                  v-for="item in condistionOptionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              ，那么跳转到题目
              <el-select
                v-model="condition.chooseQuestion"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in questionForm.questionList"
                  :key="item.questionText"
                  :label="item.questionText"
                  :value="item.questionId"
                >
                </el-option>
              </el-select>
              <i
                class="el-icon-remove"
                @click="removeCondition(index, conditionData)"
              ></i>
            </div>
          </template>
          <template v-else>
            <div
              class="dialog-condition-item"
              v-for="(condition, index) in conditionData"
              :key="condition.selectData"
            >
              跳转到题目
              <el-select
                v-model="condition.chooseQuestion"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in questionForm.questionList"
                  :key="item.questionText"
                  :label="item.questionText"
                  :value="item.questionId"
                >
                </el-option>
              </el-select>
            </div>
          </template>
        </div>
        <div
          class="addquestion"
          @click="addConditionOptions"
          v-if="conditionData.length < condistionOptionList.length"
        >
          <i class="el-icon-plus"></i>新增条件
        </div>
      </template>
    </dialog-box>
  </div>
</template>

<script>
import Formcontent from "@Acomp/form/formItem.vue";
import QuestionItem from "@Acomp/form/questionItem.vue";
import DialogBox from "@Acomp/dialog/index.vue";
export default {
  name: "questionnaireForm",
  components: { Formcontent, QuestionItem, DialogBox },
  data() {
    return {
      questionForm: {
        channel: "1",
        type: "1",
        position: "1",
        mainColor: "#0089FF",
        textColor: "#333333",
        bgColor: "#ffffff",
        frequency: "",
        timeValue: "",
        questionText: "你有多大可能性将我们推荐给朋友？",
        questionShare: false,
        questionSeted: false,
        questionList: [
          {
            questionId: "1",
            questionText: "你感觉我们产品好用吗？",
            questionType: "1",
            answerList: ["选项一", "选项二"],
            setData: {
              describe: false,
              required: false,
              order: false,
            },
            questionShare: false,
            questionSeted: false,
            description: "您的反馈对我们非常重要，请尽可能详细描述",
          },
          {
            questionId: "2",
            questionText: "你的岗位/身份/角色是?",
            questionType: "3",
            answerList: [],
            setData: {
              describe: false,
              required: false,
              order: false,
            },
            questionShare: false,
            questionSeted: false,
            description: "您的反馈对我们非常重要，请尽可能详细描述",
          },
        ],
        setText1: "肯定不会",
        setText2: "非常愿意",
        questionId: "1",
      },
      rules: {},
      channelList: [
        {
          name: "网页",
          label: "1",
        },
        {
          name: "小程序",
          label: "2",
        },
      ],
      typeList: [
        {
          name: "对话框",
          label: "1",
        },
        {
          name: "icon",
          label: "2",
        },
      ],
      positionOptions: [
        {
          value: "1",
          label: "底部右边",
        },
        {
          value: "2",
          label: "右下角",
        },
        {
          value: "3",
          label: "底部中间",
        },
        {
          value: "4",
          label: "底部平铺",
        },
        {
          value: "5",
          label: "底部左边",
        },
        {
          value: "6",
          label: "页面正中",
        },
      ],
      timeOptions: [
        {
          value: "1",
          label: "日",
        },
        {
          value: "2",
          label: "周",
        },
        {
          value: "3",
          label: "月",
        },
      ],
      dialogTitle: "设置",
      showDialog: false,
      showOptionsDialog: false,
      questionId: "",
      showConditionFrist: false,
      showCondition: false,
      conditionOptions: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "9",
          label: "9",
        },
        {
          value: "10",
          label: "10",
        },
      ],
      conditionList: [
        {
          minNum: 0,
          maxNum: 6,
          chooseQuestion: "",
        },
        {
          minNum: 6,
          maxNum: 10,
          chooseQuestion: "",
        },
      ],
			expressionList: ["很不好用", "不好用", "一般", "很棒", "爱了"],
      condistionOptionList: [],
      conditionData: [
        {
          selectData: "",
          chooseQuestion: "",
        },
      ],
    };
  },
  methods: {
    //首个设置问题条件
    jumpFirstQuestion() {
      this.showConditionFrist = true;
      this.dialogTitle = "设置 “你有多大可能性将我们推荐给朋友?” 问题的跳转";
    },
    //设置问题条件
    jumpQuestion(id) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === id) {
          this.showCondition = true;
          this.dialogTitle = `设置 ${item.questionText} 问题的跳转`;
					this.questionId = index
          if (
            item.questionType === "3"
          ) {
            this.expressionList.forEach((val, index) => {
              this.condistionOptionList.push({
                value: index,
                label: val,
              });
            });
          } else {
            item.answerList.forEach((val, index) => {
              this.condistionOptionList.push({
                value: index,
                label: val,
              });
            });
          }
        }
      });
    },
    //首个问题设置
    questionFirstSetting() {
      this.showDialog = true;
      this.dialogTitle = "nps问题的更多配置";
    },
    //问题设置
    questionSetting(val) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === val) {
          this.showOptionsDialog = true;
          this.dialogTitle = "设置";
          this.questionId = index;
        }
      });
    },
    //新增问题
    addquestion() {
      this.questionForm.questionList.push({
        questionId: this.questionForm.questionList.length + 1,
        questionText: "",
        questionType: "1",
        answerList: ["选项一"],
        questionShare: false,
        questionSeted: false,
        description: "您的反馈对我们非常重要，请尽可能详细描述",
        setData: {
          describe: false,
          required: false,
          order: false,
        },
      });
    },
    // 新增选项
    addOptions(id) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === id) {
          item.answerList.push("选项");
        }
      });
    },
    //删除问题
    delQuestion(id) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === id) {
          this.questionForm.questionList.splice(index, 1);
        }
      });
    },
    //删除问题选项
    delOptions(val) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === val.questionId) {
          item.answerList.splice(val.index, 1);
        }
      });
    },
    // 新增条件
    addCondition() {
      this.conditionList.push({
        minNum: "",
        maxNum: "",
        chooseQuestion: "",
      });
    },
    // 新增条件
    addConditionOptions() {
      this.conditionData.push({
        selectData: "",
        chooseQuestion: "",
      });
    },
    //移除条件
    removeCondition(index, list) {
      list.splice(index, 1);
    },
    changeQuestionType(val) {
      this.questionForm.questionList.forEach((item, index) => {
        if (item.questionId === val.questionId) {
          item.questionType = val.questionType;
        }
      });

    },
    //取消
    dialogOptionsCancel() {
      this.showCondition = false;
      this.condistionOptionList = [];
    },
    // 首个设置
    dialogSubmit() {
      this.showDialog = false;
      this.questionForm.questionSeted = true;
    },
    // 首个配置 submit
    dialogConditionSubmit() {
      let chooseFlag = 0;
      this.conditionList.forEach((item) => {
        if (!item.chooseQuestion) {
          chooseFlag++;
        }
      });
      if (chooseFlag !== 0) {
        this.$message({
          message: "请配置完整跳转的题目",
          type: "warning",
        });
      } else {
        this.questionForm.questionShare = true;
        this.showConditionFrist = false;
      }
    },
    //问题 设置submit
    dialogOptionSubmit() {
      console.log(this.questionForm.questionList[this.questionId].setData);
      if (
        this.questionForm.questionList[this.questionId].questionType === "4"
      ) {
        if (
          this.questionForm.questionList[this.questionId].setData.describe ||
          this.questionForm.questionList[this.questionId].setData.required
        ) {
          this.questionForm.questionList[this.questionId].questionSeted = true;
        } else {
          this.questionForm.questionList[this.questionId].questionSeted = false;
        }
      } else {
        if (this.questionForm.questionList[this.questionId].setData.order) {
          this.questionForm.questionList[this.questionId].questionSeted = true;
        } else {
          this.questionForm.questionList[this.questionId].questionSeted = false;
        }
      }
      this.showOptionsDialog = false;
    },
    dialogShareubmit() {},
  },
};
</script>
<style scoped lang="scss">
@import "~@Ascss/_var.scss";
.admin-questionnaireForm-wrapper {
  h5 {
    font-weight: normal;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .color-box,
  .color-box-item {
    display: flex;
    align-items: center;
  }
  .color-box-item {
    margin-right: 15px;
    span {
      margin-left: 15px;
    }
  }
  .title-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    line-height: 1.3;
    h3 {
      margin-bottom: 10px;
    }
    p {
      color: $textSec;
      font-size: 14px;
    }
  }
  .row-item {
    display: flex;
    flex-direction: row;
    .formInput {
      width: 100px;
      margin-right: 10px;
    }
  }
  .question-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon-box {
      width: 40px;
      padding: 0 10px;
      color: $menuText;
      text-align: center;
      line-height: 25px;
      i {
        cursor: pointer;
      }
      i.iconShare {
        color: $blue;
      }
    }
    button {
      height: 56px;
    }
  }
  .addquestion {
    font-size: 14px;
    color: $blue;
    cursor: pointer;
  }
  .dialogItem {
    margin-top: 20px;
    .dialogInput {
      width: 160px;
      margin-right: 10px;
    }
  }
  .dialog-condition-box {
    display: flex;
    flex-direction: column;
    .dialog-condition-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 15px;
      i {
        color: $menuText;
        cursor: pointer;
      }
    }
    .conditionSelect {
      width: 90px;
    }
    .el-select {
      margin: 0 5px;
    }
  }
}
</style>
