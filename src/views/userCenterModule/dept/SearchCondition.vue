<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input size="small" v-model="searchCondition.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="所属机构">
        <el-select v-model="searchCondition.org" placeholder="所属机构" clearable>
          <el-option label="机构1" value="jigou1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onCreate">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchCondition: {
        name: '',
        org: ''
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch', this.searchCondition)
    },
    onCreate () {
      this.$emit('onCreate')
    }
  }
}
</script>
