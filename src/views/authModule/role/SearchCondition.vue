<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="编码">
        <el-input v-model="searchCondition.code" placeholder="编码" size="small"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="searchCondition.name" placeholder="名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
        <el-button type="primary" @click="onCreate" size="small">新增</el-button>
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
        name: ''
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch', this.searchCondition)
    },
    onCreate () {
      this.$emit('onCreate')
    },
    getCondition () {
      return this.searchCondition
    }
  }
}
</script>
<style lang="less" scoped>
.search-condition{
  margin-bottom: 10px;
}
</style>
