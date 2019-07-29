<template>
  <el-card>
    <apiSearchCondition ref="apiSearchCondition" @onSearch="preSearch" @onCreate="openDialog('editDialog', null, 'create')"></apiSearchCondition>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="code" label="编码" width="200"></el-table-column>
      <el-table-column prop="name" label="名称" minWidth="80"></el-table-column>
      <el-table-column prop="menuName" label="关联菜单" width="80"></el-table-column>
      <el-table-column prop="tags" label="类标签" width="200"></el-table-column>
      <el-table-column prop="describe" label="接口描述" width="200"></el-table-column>
      <el-table-column prop="uri" label="地址" width="200"></el-table-column>
      <el-table-column prop="httpMethod.desc" label="请求方式" width="50"></el-table-column>
      <el-table-column prop="deprecated" label="是否过时" width="50"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="80"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="80"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apiSearchCondition from './service/ApiSearchCondition'
import { mapState } from 'vuex'
export default {
  components: {
    apiSearchCondition
  },
  computed: {
    ...mapState('developerManageModule', {
      tableData: state => state.microServiceApiPageListData
    })
  },
  data () {
    return {
      pageInfo: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    preSearch (params) {
      this.pageInfo.pageNo = 1
      this.doSearch(params)
    },
    doSearch (params = {}) {
      params.resourceType = 'URI'
      this.$store.dispatch('developerManageModule/getMicroServiceApiPageList', {
        ...params,
        ...this.pageInfo
      })
    },
  },
  created () {
    this.doSearch()
  }
}
</script>
