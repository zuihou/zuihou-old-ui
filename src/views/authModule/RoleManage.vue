<template>
  <el-card>
    <searchCondition ref="searchCondition" @onSearch="preSearch" @onCreate="openDialog('editDialog', null, 'create')"></searchCondition>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="code" label="角色编码" width="80"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
      <el-table-column prop="describe" label="角色描述" minWidth="200"></el-table-column>
      <el-table-column prop="isReadonly" label="系统角色" width="80"></el-table-column>
      <el-table-column prop="isEnable" label="状态" width="100"></el-table-column>
      <el-table-column prop="dsType" label="数据范围" width="120"></el-table-column>
      <el-table-column prop="createUser" label="创建人姓名" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="80"></el-table-column>
      <el-table-column prop="updateUser" label="更新人姓名" width="120"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDialog('editDialog', scope.row, 'edit')">编辑</el-button>
          <el-button type="text" size="small" @click="openDialog('editDialog', scope.row, 'copy')">复制</el-button>
          <el-button @click="openUserDialog('userDialog', scope.row)" type="text" size="small">关联用户</el-button>
          <el-button @click="openAuthDialog('authDialog', scope.row)" type="text" size="small">权限配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <editDialog ref="editDialog" @onSuccess="onSuccess" :type="type"></editDialog>
    <userDialog ref="userDialog" @onSuccess="onSuccess" :type="type"></userDialog>
    <authDialog ref="authDialog" @onSuccess="onSuccess" :type="type"></authDialog>
  </el-card>
</template>
<script>
import searchCondition from './role/SearchCondition'
import { mapState } from 'vuex'
import editDialog from './role/EditDialog'
import userDialog from './role/UserDialog'
import authDialog from './role/AuthDialog'
export default {
  components: {
    searchCondition,
    editDialog,
    userDialog,
    authDialog
  },
  computed: {
    ...mapState('authModule', {
      tableData: state => state.rolePageList
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
      this.$store.dispatch('authModule/getRolePageList', {
        ...params,
        ...this.pageInfo
      })
    },
    // 新增或者修改成功
    onSuccess () {
      const searchCondition = this.$refs.searchCondition.getCondition()
      this.doSearch(searchCondition)
    },
    // 打开编辑、新增弹窗
    openDialog (dialogRef, row, type) {
      if (type) this.type = type
      if (row) this.$store.commit('SET_CURRENT_ROLE_INFO', row)
      this.$refs[dialogRef].open()
    }
  },
  created () {
    this.doSearch()
  }
}
</script>
