<template>
  <div class="admin-add-wrapper">
    <!-- 头部 -->
    <div class="admin-add-header">
      <div class="title">NPS问卷</div>
      <div class="button-box">
        <el-button type="primary" size="mini">开启</el-button>
        <el-button type="success" size="mini">保存</el-button>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="admin-add-content">
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <div class="admin-add-content-box">
            <question-form></question-form>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 实时预览 -->
          <div class="admin-add-content-box">
						<question-preview></question-preview>
					</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import QuestionForm from "../../components/form.vue";
import QuestionPreview from './preview.vue'
export default {
  name: "addQuestion",
  components: { QuestionForm,QuestionPreview },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "~@Ascss/_var.scss";
.admin-add-wrapper {
  background-color: $bg_gray;
  height: 100%;
  .admin-add-header {
    width: 100%;
    display: flex;
    background-color: $cursor;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $line_gray;
  }
	.admin-add-content-box{
		padding: 20px;
	}
}
</style>
