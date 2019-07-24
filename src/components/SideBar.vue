<template>
  <el-menu
    default-active="deptManage"
    class="side-bar"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse"
    @select="menuSelect">
    <div class="switch-icon" @click="collapse = !collapse">
      <i :class="`el-icon-s-${collapse ? 'un' : ''}fold`"></i>
    </div>
    <el-submenu index="userCenter">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>用户中心</span>
      </template>
      <el-menu-item index="deptManage">部门管理</el-menu-item>
      <el-menu-item index="stationManage">岗位管理</el-menu-item>
      <el-menu-item index="userManage">用户管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      collapse: true
    }
  },
  methods: {
    menuSelect (index, indexPath) {
      if (index && indexPath) {
        this.$router.push(index)
      }
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
