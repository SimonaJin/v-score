<template>
  <div class="admin-home">
    <div class="home-header">
      <div class="title">问卷列表</div>
      <!-- 查询 -->
      <div class="query-content">
        <el-date-picker
          v-model="query.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-select v-model="query.type" placeholder="全部状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="admin-home-content">
      <div class="content-box">
        <div class="content-item content-create" @click="goPage">
          <div>
            <i class="el-icon-circle-plus-outline"></i>
            <span>新建问卷</span>
          </div>
        </div>
        <div class="content-item content-box-item">
          <h3>NSP问卷 <i class="el-icon-star-off"></i></h3>
          <div class="timeInfo">
            2022-12-27 20:36 | 8cf8f21ad4134b5e<i
              class="el-icon-document-copy"
            ></i>
          </div>
          <div class="label"><span>web/h5</span><span>NPS</span></div>
          <div class="typeInfo">
            <div class="typeInfo-left">
              <div class="text">
                <span class="num">0</span>
                <span class="name">反馈</span>
              </div>
              <div class="text">
                <span class="num type-pass">运行中</span>
                <span class="name">状态</span>
              </div>
            </div>
            <div class="typeInfo-set">
              <el-popover placement="right" width="400" trigger="click">
								<el-row>
									复制问卷
								</el-row>
								<el-row>
									删除问卷
								</el-row>
                <i class="el-icon-more" slot="reference"></i>
              </el-popover>
            </div>
          </div>
					<div class="set-content">
						<el-button type="primary" size="mini">统计</el-button>
						<el-button size="mini">获取代码</el-button>
						<el-button type="danger" size="mini">停止</el-button>
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
    return {
			query:{
				time:"",
				type:""
			},
			options:[{
				
			}]
		};
  },
  mounted() {},
  methods: {
		//跳转新建页面
		goPage(){
			this.$router.push({name:"addQuestion"})
		},
		// 查询
		handleQuery(){

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
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
    }
    .query-content > div {
      margin-right: 15px;
    }
  }
  .admin-home-content {
    margin: 0 20px 0 20px;
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
      .timeInfo {
        font-size: 12px;
        color: $dark_gray;
        i {
          margin-left: 5px;
        }
      }
      .label {
        margin: 12px 0;
        span {
          background-color: $bg_gray;
          color: $dark_gray;
          font-size: 12px;
          height: 20px;
          padding: 0 5px;
          line-height: 19px;
          border-radius: 4px;
          margin-right: 5px;
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
						.num{
							font-size: 14px;
							line-height: 24px;
						}
            .name {
              font-size: 12px;
              color: $dark_gray;
							line-height: 18px;
            }
						.type-pass{
							color: $green;
						}
          }
        }
      }
			.set-content{
				width: 80%;
				background-color: $cursor;
				position: absolute;
				bottom: 10px;
				left: 10px;
				padding: 10px;
				display: none;
			}
			
    }
  }
}
</style>
