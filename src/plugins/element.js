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
  Input,
  Select,
  Option,
  Table,
  TableColumn,
  Card,
  Dialog,
  Switch,
  InputNumber,
  Tree
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
  Tree
]
eleComponnets.forEach(item => Vue.use(item))

Vue.prototype.$message = Message
