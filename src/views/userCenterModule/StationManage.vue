<template>
  <el-card>
    <searchCondition ref="searchCondition" @onSearch="preSearch" @onCreate="openDialog('create')"></searchCondition>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="item" label="名称" width="80"></el-table-column>
      <el-table-column prop="item" label="所属机构" width="120"></el-table-column>
      <el-table-column prop="item" label="描述" minWidth="200"></el-table-column>
      <el-table-column prop="item" label="状态" width="80"></el-table-column>
      <el-table-column prop="item" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="item" label="最后修改人" width="120"></el-table-column>
      <el-table-column prop="item" label="更新时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="openDialog('copy', scope.row)">复制</el-button>
          <el-button @click="openDialog('detail', scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <editDialog ref="editDialog" @onSuccess="onSuccess" :type="type"></editDialog>
  </el-card>
</template>
<script>
import searchCondition from './dept/SearchCondition'
import { mapState } from 'vuex'
import editDialog from './dept/EditDialog'
export default {
  components: {
    searchCondition,
    editDialog
  },
  computed: {
    ...mapState('userCenterModule', {
      tableData: state => state.deptPageList
    })
  },
  data () {
    return {
      type: 'create',
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
      this.$store.dispatch('userCenterModule/getDeptPageList', {
        ...params,
        ...this.pageInfo
      })
    },
    // 新增或者修改成功
    onSuccess () {
      const searchCondition = this.$refs.searchCondition.getCondition()
      this.doSearch(searchCondition)
    },
    // 打开弹窗
    openDialog (type, row) {
      this.type = type
      this.$refs.editDialog.open(row)
    }
  },
  created () {
    this.doSearch()
  }
}
</script>
