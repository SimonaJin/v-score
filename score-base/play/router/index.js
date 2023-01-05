import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@Aviews/home/index.vue'
import Login from '@Aviews/login/index.vue'
import Layout from '@Aviews/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
		name:"Login",
    component: Login
  },
	{
    path: '/404',
    component: ()=> import('@Aviews/404.vue')
  },
	{
    path: '/',
    name: 'Index',
    component: Layout,
		redirect: {name:"Login"},
		meta:{
			title:"问卷管理",icon:"el-icon-s-order"
		},
		children:[
			{
				path: '/questionnaire/add',
				name:"addQuestion",
				component: ()=> import('@Aviews/home/add.vue'),
				meta:{
					title:"新建问卷",icon:"el-icon-s-order"
				}
			},
			{
				path: '/questionnaire/index',
				name:"questionIndex",
				component: ()=> import('@Aviews/home/index.vue'),
				meta:{
					title:"问卷列表",icon:"el-icon-s-order"
				}
			},
			{
				path: '/questionnaire/detail',
				name:"questionnaireDetail",
				component: ()=> import('@Aviews/home/detail.vue'),
				hidden: true 
			}
		]
  },
	{
    path: '/spectaculars',
    component: Layout,
		children:[
			{
				path: '/spectaculars',
				name:"Spectaculars",
				component: ()=> import('@Aviews/spectaculars/index.vue'),
				meta:{
					title:"问卷看板",icon:"el-icon-folder"
				}
			},
			{
				path: '/spectaculars/add',
				name:"SpectacularsAdd",
				component: ()=> import('@Aviews/spectaculars/add.vue'),
				hidden: true 
			},
			{
				path: '/spectaculars/detail',
				name:"SpectacularsDetail",
				component: ()=> import('@Aviews/spectaculars/detail.vue'),
				hidden: true 
			}
		]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
