<template>
  <div class="admin-spectDetail-wrapper">
    <h3>
			<span>{{ detailData.title }}</span>
			<span></span>
		</h3>
    <div class="detailTime">
      <el-select v-model="queryVal" placeholder="请选择" @change="changeQuery">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker v-if="timeShow" style="margin-left: 15px;"
        v-model="queryTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <div class="detail-box">
			<!-- 总体数据 -->
			<div class="detail-info">
				<div class="detail-item">
					<div class="num">0%</div>
					<div class="name">整体NPS</div>
				</div>
				<div class="detail-item">
					<div class="num">0</div>
					<div class="name">响应数</div>
				</div>
				<div class="detail-item  detail-status-box">
					<div class="text"><span class="round green-round"></span>0推荐者（0%）</div>
					<div class="text"><span class="round yellow-round"></span>0被动者（0%）</div>
					<div class="text"><span class="round red-round"></span>0贬损者（0%）</div>
				</div>
				<div class="detail-item">
					<div class="num">1</div>
					<div class="name">显示数</div>
				</div>
				<div class="detail-item">
					<div class="num">0%</div>
					<div class="name">响应率</div>
				</div>
			</div>
			<!-- echarts -->
			<div class="detail-echarts-content">
				<h5>echarts图表封装示例</h5>
    <chart-view class="chart-content" :chart-option="chartOpt" :auto-resize="true" :play-highlight="true" height="100%" />
		<h5>echarts图表封装示例</h5>
    <chart-view class="chart-content" :chart-option="chartOpt2" :auto-resize="true" :play-highlight="true" height="100%" />
		<h5>echarts图表封装示例</h5>
    <chart-view class="chart-content" :chart-option="chartOpt3" :auto-resize="true" :play-highlight="true" height="100%" />
			</div>
		</div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: "spectacularDeatil",
  data() {
    return {
      options: [
        {
          value: "0",
          label: "自定义",
        },
        {
          value: "1",
          label: "上周",
        },
        {
          value: "2",
          label: "上个月",
        },
        {
          value: "3",
          label: "过去30天",
        },
        {
          value: "4",
          label: "全部",
        },
      ],
			timeShow: false,
			queryVal:"1",
      queryTime: "",
      detailData: {
        title: "标题1",
      },
			chartOpt: {},
      chartOpt2: {},
			chartOpt3: {}
    };
  },
  mounted() {
		this.chartOpt = this.$eChartFn.testBar()
    this.chartOpt3 = this.$eChartFn.testBar2()

    // this.chartOpt2 = this.$eChartFn.getPieChart([100, 23, 43, 65], ['#36CBCB', '#FAD337', '#F2637B', '#975FE4'])
	},
  methods: {
		//改变下啦时间
		changeQuery(val){
			val ==='0'? this.timeShow =true: this.timeShow =false
		}
	},
};
</script>
<style lang="scss" scoped>
@import "~@Ascss/_var.scss";
.admin-spectDetail-wrapper{
	padding: 20px;
	h3{
		line-height: 2;
		margin-bottom: 10px;
	}
	.detail-info{
		display: flex;
		flex-direction: row;
		margin: 20px 0;
		.detail-item{
			display: flex;
			flex-direction:column;
			justify-content: center;
			align-items: center;
			width: 120px;
			.num{
				font-size: 28px;
				margin: 10px 0;
			}
			.name{
				font-size: 16px;
				color: $dark_gray;
			}
			.text{
				font-size: 14px;
				color: $dark_gray;
				line-height: 22px;

			}
			.round{
				width: 8px;
				height: 8px;
				border-radius: 4px;
				display: inline-block;
				margin-right: 5px;
			}
			.green-round{
				background-color: $green;
			}
			.yellow-round{
				background-color: $yellow;
			}
			.red-round{
				background-color: $red;
			}
		}
	}
	.detail-echarts-content{
		margin: 20px 0;
		h5{
			font-weight: normal;
		}
	}
}
</style>
