<template>
  <el-menu
    :default-active="defaultActive"
    class="side-bar"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
    @select="menuSelect">
    <div class="switch-icon" @click="collapse = !collapse">
      <i :class="`el-icon-s-${collapse ? 'un' : ''}fold`"></i>
    </div>
    <template v-for="(menu, idx) in authMenu">
      <el-submenu :index="menu.href" :key="idx" v-if="menu.children && menu.children.length">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <template v-for="(subMenu, index) in menu.children">
          <cycle-menu :menu="subMenu" :key="index"></cycle-menu>
        </template>
      </el-submenu>
      <el-menu-item :index="menu.href" v-else :key="idx">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
// import authManageApi from '@/api/AuthManageApi.js'
import cycleMenu from './CycleMenu.vue'
export default {
  components: {
    cycleMenu
  },
  data () {
    return {
      collapse: true,
      defaultActive: 'deptManage'
    }
  },
  computed: {
    authMenu () {
      return this.$store.state.authModule.authMenu
    }
  },
  created () {
    this.$store.dispatch('authModule/authMenu')
  },
  methods: {
    menuSelect (href) {
      this.$router.push({
        name: href
      })
    }
  },
  watch: {
    // 路由变化更新菜单选中项
    '$route' (val) {
      this.defaultActive = val.name
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar{
  width: 240px;
  height: 100%;
  overflow-y: auto;
  &.el-menu--collapse{
    width: auto;
  }
  .switch-icon{
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 26px;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
    &:hover{
      color: #ffd04b;
    }
  }
}
</style>
