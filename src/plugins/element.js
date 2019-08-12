import Vue from 'vue'
import {
  Button,
  Message,
  MessageBox,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Cascader,
  Popover,
  Divider,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Card,
  Dialog,
  Switch,
  InputNumber,
  Tree,
  Pagination
} from 'element-ui'

const eleComponnets = [
  Button,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Cascader,
  Popover,
  Divider,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Card,
  Dialog,
  Switch,
  InputNumber,
  Tree,
  Pagination
]
eleComponnets.forEach(item => Vue.use(item))

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
