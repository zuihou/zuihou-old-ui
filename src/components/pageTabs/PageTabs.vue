<template>
  <el-tabs
    v-model='targetName'
    type='card'
    :closable='isClosable'
    @edit='handleTabsEdit'
    @tab-click='tabClick'
    v-show='tabs.length'
  >
    <el-tab-pane v-for='item in tabs' :label='item.title' :name='item.name' :key='item.title'></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      targetName: '',
      tabs: []
    }
  },
  computed: {
    isClosable () {
      return this.tabs.length > 1
    }
  },
  methods: {
    handleTabsEdit (targetName, action) {
      if (action === 'remove') {
        const currentIdx = this.tabs.findIndex(teb => teb.name === targetName)
        // 关闭了当前选中的tab
        if (targetName === this.targetName) {
          const isLastTab = currentIdx === this.tabs.length - 1
          let tab = null
          if (isLastTab) {
            tab = this.tabs[currentIdx - 1]
          } else {
            tab = this.tabs[currentIdx + 1]
          }
          this.targetName = tab.name
          this.$router.push(this.targetName)
        }
        this.tabs.splice(currentIdx, 1)
      }
    },
    tabClick (obj) {
      // this.$router.push(obj.name)
      // 根据路由name跳转，如果有子路由，用name跳转
      this.$router.push({ name: obj.name })
    }
  },
  watch: {
    '$route' (val) {
      if (val.name && val.meta && val.meta.title) {
        if (!this.tabs.find(item => item.name === val.name)) {
          this.tabs.push({
            title: val.meta.title,
            name: val.name
          })
        }
        this.targetName = val.name
      }
    }
  }
}
</script>
