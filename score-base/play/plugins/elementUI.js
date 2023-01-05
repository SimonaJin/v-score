import Vue from 'vue'
import {
	Dialog,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	Radio,
	RadioGroup,
	Checkbox,
	CheckboxButton,
	Select,
	Option,
	OptionGroup,
	Button,
	DatePicker,
	TimePicker,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tree,
	Alert,
	Row,
	Col,
	Header,
	Aside,
	Main,
	Footer,
	Loading,
	MessageBox,
	Message,
	Dropdown,
  DropdownMenu,
  DropdownItem,
	Scrollbar,
	Icon,
	ColorPicker,
	Popover
} from 'element-ui'
const components = {
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	Radio,
	RadioGroup,
	Checkbox,
	CheckboxButton,
	Select,
	Option,
	OptionGroup,
	Button,
	DatePicker,
	TimePicker,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tree,
	Alert,
	Row,
	Col,
	Header,
	Aside,
	Main,
	Footer,
	Dropdown,
  DropdownMenu,
  DropdownItem,
	Scrollbar,
	Icon,
	ColorPicker,
	Popover,
	Dialog
}
Object.entries(components).forEach(([key, component]) => {
	Vue.use(component)
})
Vue.prototype.$Dialog = Dialog
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;