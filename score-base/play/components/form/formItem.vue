<template>
	<div class="admin-quesForm-box">
		<h5>{{ title }}</h5>
		<div class="question-content">
			<slot name="questionItem"></slot>
		</div>	
	</div>
</template>

<script>
export default {
 name: "formcontent",
	props:{
		title:String
	}
};
</script>
<style scoped lang="scss">
@import "~@Ascss/_var.scss";
.admin-quesForm-box{
	background-color: $cursor;
	padding: 20px;
	border: 1px solid $line_gray;
	margin-bottom: 15px;
	h5{
		font-weight: normal;
		font-size: 14px;
		margin-bottom: 10px;
	}
}
</style>

