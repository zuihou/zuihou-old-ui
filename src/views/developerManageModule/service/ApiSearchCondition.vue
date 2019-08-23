<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="编码">
        <el-input v-model="searchCondition.code" placeholder="编码"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="searchCondition.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="searchCondition.uri" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="类标签">
        <el-input v-model="searchCondition.tags" placeholder="类标签"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchCondition: {
        code: '',
        name: '',
        uri: '',
        tags: ''
      }
    }
  },
  methods: {
      getCondition() {
          return this.searchCondition
      },
    onSearch () {
      this.$emit('onSearch', this.searchCondition)
    }
  }
}
</script>
<style lang="less" scoped>
  .search-condition {
  margin-bottom: 10px;
}
</style>
