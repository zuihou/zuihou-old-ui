<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="操作IP">
        <el-input v-model="searchCondition.requestIp" placeholder="操作IP"></el-input>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="searchCondition.userName" placeholder="操作人"></el-input>
      </el-form-item>
      <el-form-item label="日志类型">
        <el-select v-model="searchCondition.type" placeholder="日志类型">
          <el-option v-for="(val, key) in enums.LogType" :label="val" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作描述">
        <el-input v-model="searchCondition.description" placeholder="操作描述"></el-input>
      </el-form-item>
      <el-form-item label="请求地址">
        <el-input v-model="searchCondition.requestUri" placeholder="请求地址"></el-input>
      </el-form-item>
      <el-form-item label="请求类型">
        <el-select v-model="searchCondition.httpMethod" placeholder="请求类型">
          <el-option v-for="(val, key) in enums.HttpMethod" :label="val" :value="key" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类路径">
        <el-input v-model="searchCondition.classPath" placeholder="类路径"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  computed: {
    enums () {
      return this.$store.state.enums
    }
  },
  data () {
    return {
      searchCondition: {
        requestIp: '',
        userName: '',
        type: '',
        description: '',
        requestUri: '',
        httpMethod: '',
        classPath: ''
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
