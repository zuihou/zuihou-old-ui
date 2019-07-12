<template>
  <div id="app">
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
    }
  }
}
</style>
