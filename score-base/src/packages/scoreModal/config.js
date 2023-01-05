export default {
	title: String, // 提示信息内容
	type: { // 问卷类型 nps ces normal
		type: String,
		default: "nps",
	},
	channelType: { //问卷渠道 web link wx ios android
		type: String,
		default: "web",
	},
	modality: { //问卷形式 dialog icon
		type: String,
		default: "dialog",
	},
	location: {
		// 显示位置 底部中间 bottomCenter 底部右边 bottomRight 底部左边 bottomLeft 底部平铺bottomTile 右下 Rightbottom  页面中间 pageCenter
		type: String,
		default: "bottomRight",
	},
	mainColor: { //主色 默认16位
		type: String,
		default: "#0A8AF8",
	},
	textColor: { // 文本颜色 默认16位
		type: String,
		default: "#333333",
	},
	bgColor: { // 背景色 默认16位
		type: String,
		default: "#FFFFFF",
	},
	displayMode: { // 显示间隔 以月计算
		type: String,
		default: "1",
	},
	disPlayTime: { //进入显示时间 以秒计算 暂时20秒默认 
		type: String,
		default: "20",
	},
	high_legend: String, // 评分最高值显示
	low_legend: String, // 评分最低值显示
	max: Number,
	min: Number,
	rating_list: {
		type: Array,
		default: ()=>[0,1,2,3,4,5,6,7,8,9]
	},
	question_id: Number,
	next_question_index: Number
}