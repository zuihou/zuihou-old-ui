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
  Divider
} from 'element-ui'

const eleComponnets = [
  Button,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Cascader,
  Popover,
  Divider
]
eleComponnets.forEach(item => Vue.use(item))

Vue.prototype.$message = Message
