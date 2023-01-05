<template>
  <div class="admin-home">
    <div class="home-header">
      <div class="title">问卷看板</div>
      <span>整体查看多问卷汇总数据 </span>
    </div>
    <div class="admin-home-content">
      <div class="content-box">
        <div class="content-item content-create" @click="gopage">
          <div>
            <i class="el-icon-circle-plus-outline"></i>
            <span>新建看板</span>
          </div>
        </div>
        <div class="content-item content-box-item" @click="goDetail">
          <div class="spect-box">
            <div class="spect-box-left">
              <div class="title">kk</div>
              <div class="time">创建时间：2022-12-27</div>
            </div>
            <div class="spect-box-right">
              <span class="num">0</span>
              <span class="name">NPS(%)</span>
            </div>
          </div>

          <div class="typeInfo">
            <div class="typeInfo-left">
              <div class="text">
                <span class="num">3</span>
                <span class="name">问卷数</span>
              </div>
              <div class="text">
                <span class="num">0</span>
                <span class="name">总反馈</span>
              </div>
            </div>
            <div class="typeInfo-set">
              <el-popover placement="right" width="400" trigger="click">
                <i class="el-icon-more" slot="reference"></i>
              </el-popover>
            </div>
          </div>
					<div class="set-content">
						<el-button type="primary" size="mini">查看报告</el-button>
						<el-button size="mini">编辑</el-button>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionIndex",
  data() {
    return {};
  },
  mounted() {},
  methods: {
		gopage(){
			this.$router.push({name:"SpectacularsAdd"})
		},
		goDetail(){
			this.$router.push({name:"SpectacularsDetail",query:{id:"123"}})
		}
	},
};
</script>
<style lang="scss" scoped>
@import "~@Ascss/_var.scss";
.admin-home {
  height: 100%;
  .home-header {
    margin: 20px 5px 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 20px;
    }
    span {
      font-size: 12px;
      color: $dark_gray;
      margin-left: 20px;
    }
  }
  .admin-home-content {
    margin: 0px 20px 0 20px;
    width: 100%;
    display: inline-block;
    .content-box {
      width: 100%;
    }
    .content-item {
      border: 1px solid $line_gray;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      height: 156px;
      width: 319px;
      box-sizing: border-box;
      border-radius: 2px;
      margin-right: 26px;
      margin-top: 24px;
      float: left;
      padding: 15px 20px;
			&:hover{
				border-color: $blue;
				.set-content{
					display: block;
				}
			}
    }
    .content-create {
      color: $blue;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
    .content-box-item {
			position: relative;
      h3 {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 12px;
        i {
          color: $dark_gray;
        }
      }
      .spect-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title {
          font-size: 16px;
          line-height: 28px;
        }
        .time {
          font-size: 12px;
          color: $dark_gray;
          line-height: 16px;
        }
        .spect-box-right {
          width: 69px;
          height: 69px;
          border-radius: 8px;
          background-color: #f7f8fb;
          padding: 12px 10px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
					.num{
						line-height: 30px;
						font-size: 18px;
					}
          .name {
            font-size: 12px;
            color: $dark_gray;
          }
        }
      }
      .typeInfo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 13px;
        align-items: center;
        .typeInfo-left {
          display: flex;
          justify-self: flex-start;
          .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 60px;
            text-align: left;
            .num {
              font-size: 14px;
              line-height: 24px;
            }
            .name {
              font-size: 12px;
              color: $dark_gray;
              line-height: 18px;
            }
            .type-pass {
              color: $green;
            }
          }
        }
				.typeInfo-set{
					width: 60px;
					text-align: center;
					color: $blue;
				}
      }
			.set-content{
				width: 70%;
				background-color: $cursor;
				position: absolute;
				bottom: 20px;
				left: 10px;
				padding: 10px;
				display: none;
			}
    }
  }
}
</style>
