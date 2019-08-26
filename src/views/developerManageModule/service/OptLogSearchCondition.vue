<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="操作IP">
        <el-input placeholder="操作IP" v-model="searchCondition.requestIp"></el-input>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input placeholder="操作人" v-model="searchCondition.userName"></el-input>
      </el-form-item>
      <el-form-item label="日志类型">
        <el-select placeholder="日志类型" v-model="searchCondition.type">
          <el-option :key="key" :label="val" :value="key" v-for="(val, key) in enums.LogType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作描述">
        <el-input placeholder="操作描述" v-model="searchCondition.description"></el-input>
      </el-form-item>
      <el-form-item label="请求地址">
        <el-input placeholder="请求地址" v-model="searchCondition.requestUri"></el-input>
      </el-form-item>
      <el-form-item label="请求类型">
        <el-select placeholder="请求类型" v-model="searchCondition.httpMethod">
          <el-option :key="key" :label="val" :value="key" v-for="(val, key) in enums.HttpMethod"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类路径">
        <el-input placeholder="类路径" v-model="searchCondition.classPath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">查询
        </el-button>
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
