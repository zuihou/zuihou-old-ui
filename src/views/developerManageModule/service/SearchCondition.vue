<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="服务ID">
        <el-input v-model="searchCondition.eurekaCode" placeholder="服务ID"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="searchCondition.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="searchCondition.describe" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="接口地址">
        <el-input v-model="searchCondition.swaggerUrl" placeholder="接口地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onSync">同步服务</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchCondition: {
        eurekaCode: '',
        name: '',
        describe: '',
        swaggerUrl: ''
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch', this.searchCondition)
    },
    getCondition () {
      return this.searchCondition
    },
    onSync () {
      this.$store.dispatch('developerManageModule/microServiceSync', {
      })
    }
  }
}
</script>
<style lang="less" scoped>
.search-condition{
  margin-bottom: 10px;
}
</style>
