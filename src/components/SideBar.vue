<template>
  <el-menu
    default-active="2"
    class="side-bar"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapse">
    <div class="switch-icon" @click="collapse = !collapse">
      <i :class="`el-icon-s-${collapse ? 'un' : ''}fold`"></i>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      collapse: false
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
