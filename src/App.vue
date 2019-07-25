<template>
  <div id="app">
    <template v-if="$route.meta.withoutLayout">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="app-header">
        <Header></Header>
      </div>
      <div class="app-body">
        <div class="app-side-bar">
          <SideBar></SideBar>
        </div>
        <div class="app-content">
          <router-view></router-view>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'app',
  components: {
    SideBar,
    Header
  },
  created () {
    const userInfo = localStorage.getItem('userInfo')
    const token = localStorage.getItem('token')
    if (userInfo && token) {
      this.$store.commit('SET_USER_INFO', JSON.parse(userInfo))
      this.$store.commit('SET_TOKEN', token)
    } else {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  .app-header{
    height: 60px;
    min-height: 60px;
    margin-bottom: 2px;
  }
  .app-body{
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    .app-side-bar{
      height: 100%;
      overflow-y: auto;
    }
    .app-content{
      flex-grow: 1;
      overflow-y: auto;
      padding: 15px;
    }
  }
}
</style>
