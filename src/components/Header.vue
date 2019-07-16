<template>
  <div class="header-content">
    <div class="logo"></div>
    <div class="user-info">
      <el-popover
        placement="bottom"
        width="80"
        trigger="hover">
        <span>个人中心</span>
        <el-divider></el-divider>
        <span>基本信息</span>
        <div class="info" slot="reference">
          <img class="header-img" :src="$store.state.userInfo.photo" @error="photoErr">
          <div class="name">{{$store.state.userInfo.name}}</div>
        </div>
      </el-popover>
      <div class="logout" @click="logout"><i class="el-icon-toilet-paper"></i> 退出</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    photoErr () {
      this.$store.commit('SET_USER_INFO', {
        photo: require('./../assets/imgs/common/header.png')
      })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="less" scoped>
.header-content{
  height: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 2px #ebebeb;
  .logo{
    width: 100px;
    height: 100%;
    background: url('~@/assets/imgs/common/logo.png') left center no-repeat;
    background-size: cover;
    float: left;
    border-radius: 5px;
  }
  .user-info{
    float: right;
    height: 100%;
    .info{
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      float: left;
      margin-right: 15px;
      .header-img{
        height: 30px;
        width: 30px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 10px;
        border-radius: 50%;
      }
      .name{
        font-size: 16px;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .logout{
      height: 100%;
      font-size: 16px;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        cursor: pointer;
        color: #F56C6C;
      }
    }
  }
}
</style>
