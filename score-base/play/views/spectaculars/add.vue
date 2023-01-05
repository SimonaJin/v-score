<template>
  <div class="admin-spectDetail-wrapper">
    <div class="spectDetail-header">
			<div class="back" @click="goBack"><i class="el-icon-arrow-left"></i> 返回</div>
      <h3>新建看板</h3>
    </div>
    <div class="spectDetail-content">
      <el-form
        :model="spectAddForm"
        :rules="rules"
        ref="spectAddForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="看板名称" prop="name">
              <el-input v-model="spectAddForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="看板类型" prop="resource">
              <el-radio-group v-model="spectAddForm.type">
                <el-radio label="NPS看板"></el-radio>
                <el-radio label="CES看板"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('spectAddForm')"
            >创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpectacularsAdd",
  data() {
    return {
      rules: {},
      spectAddForm: {
        name: "",
        type: "",
      },
    };
  },
  mounted() {},
  methods: {
		goBack(){
			this.$router.go(-1)
		},
    submitForm(formName) {
			this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
		},
  },
};
</script>
<style lang="scss" scoped>
@import "~@Ascss/_var.scss";
.admin-spectDetail-wrapper{
	padding: 20px;
	.spectDetail-header{
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		.back{
			color: $blue;
			font-size: 12px;
			margin-right: 20px;
		}
		h3{
			font-size: 18px;
			height: 36px;
			line-height: 36px;
		}
	}
}
</style>
