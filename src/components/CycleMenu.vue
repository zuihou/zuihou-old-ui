<template>
  <el-submenu :index="menu.href" :key="menu.href" v-if="menu.children && menu.children.length">
    <span slot="title">{{menu.name}}</span>
    <template v-for="subMenu in menu.children">
      <cycle-menu :menu="subMenu" :key="subMenu.href"></cycle-menu>
    </template>
  </el-submenu>
  <el-menu-item :index="menu.href" :key="menu.href" v-else>
    <span>{{menu.name}}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'cycleMenu',
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>
