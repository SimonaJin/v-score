// 弹窗组件
<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="cancel">
        <div class="dialog-content">
					<slot name="dialogContent"></slot>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary"  @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'dialogExample',
    data() {
        return {
            
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
				title: {
            type: String,
            default: '设置',
        },
    },
    methods: {
      cancel() {
        this.$emit('dialogCancel');
      },
			submit(){
				this.$emit('dialogSubmit');
			}
    },
}
</script>
<style scoped lang="scss">
.dialog-footer{
	display: flex;
	justify-content: center;
}
</style>