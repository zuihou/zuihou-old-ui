<template>
  <div class="search-condition">
    <el-form
      :inline="true"
      :model="searchCondition"
      class="demo-form-inline"
    >
      <el-form-item label="服务ID">
        <el-input
          placeholder="服务ID"
          v-model="searchCondition.eurekaCode"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          placeholder="名称"
          v-model="searchCondition.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          placeholder="描述"
          v-model="searchCondition.describe"
        ></el-input>
      </el-form-item>
      <el-form-item label="接口地址">
        <el-input
          placeholder="接口地址"
          v-model="searchCondition.swaggerUrl"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="onSearch"
          type="primary"
        >查询
        </el-button>
        <el-button
          @click="onSync"
          type="primary"
        >同步服务
        </el-button>
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
        this.$store.dispatch('developerManageModule/microServiceSync', {})
    }
  }
}
</script>
<style lang="less" scoped>
  .search-condition {
  margin-bottom: 10px;
}
</style>
