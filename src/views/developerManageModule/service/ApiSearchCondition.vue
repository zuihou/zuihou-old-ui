<template>
  <div class="search-condition">
    <el-form
      :inline="true"
      :model="searchCondition"
      class="demo-form-inline"
    >
      <el-form-item label="编码">
        <el-input
          placeholder="编码"
          v-model="searchCondition.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          placeholder="名称"
          v-model="searchCondition.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          placeholder="地址"
          v-model="searchCondition.uri"
        ></el-input>
      </el-form-item>
      <el-form-item label="类标签">
        <el-input
          placeholder="类标签"
          v-model="searchCondition.tags"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="onSearch"
          type="primary"
        >查询
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
