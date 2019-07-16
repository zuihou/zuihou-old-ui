import Vue from 'vue'
import {
  Button,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Cascader,
  Popover,
  Divider,
  Form,
  FormItem,
  Input
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
  Input
]
eleComponnets.forEach(item => Vue.use(item))

Vue.prototype.$message = Message
