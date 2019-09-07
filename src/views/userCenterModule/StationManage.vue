<template>
  <el-card>
    <searchCondition ref='searchCondition' @onSearch='preSearch' @onCreate='openDialog("create")'></searchCondition>
    <el-table :data='tableData' border style='width: 100%'>
      <el-table-column prop='name' label='名称' width='120'></el-table-column>
      <el-table-column prop='orgId' label='所属组织' width='200'></el-table-column>
      <el-table-column prop='describe' label='描述' minWidth='200'></el-table-column>
      <el-table-column prop='status' label='状态' width='80'>
        <template slot-scope='scope'>{{ scope.row.status === true ? '开启' : '关闭' }}</template>
      </el-table-column>
      <el-table-column prop='updateTime' label='更新时间' width='180'></el-table-column>
      <el-table-column fixed='right' label='操作' width='120'>
        <template slot-scope='scope'>
          <el-button type='text' size='small' @click='openDialog("edit", scope.row)'>编辑</el-button>
          <!-- <el-button type="text" size="small" @click="openDialog('copy', scope.row)">复制</el-button> -->
          <el-button @click='openDialog("detail", scope.row)' type='text' size='small'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :limit.sync='pageInfo.pageSize'
      :page.sync='pageInfo.pageNo'
      :total='pageTotal'
      @pagination='doSearch({})'
      v-show='pageTotal > 0'
    />
    <editDialog ref='editDialog' :onSuccess='onSuccess'></editDialog>
  </el-card>
</template>
<script>
import searchCondition from './dept/SearchCondition'
// import { mapState } from 'vuex'
import editDialog from './dept/EditDialog'
import userCenterApi from '@/api/UserCenterApi.js'
import Pagination from '@/components/Pagination'
export default {
  components: {
    searchCondition,
    editDialog,
    Pagination
  },
  computed: {
  },
  data () {
    return {
      type: 'create',
      pageInfo: {
        pageNo: 1,
        pageSize: 10
      },
      pageTotal: 0,
      tableData: []
    }
  },
  methods: {
    preSearch (params) {
      this.pageInfo.pageNo = 1
      if (params.orgId) {
        params.orgId = params.orgId[params.orgId.length - 1]
      }
      this.doSearch(params)
    },
    doSearch (params) {
      userCenterApi.getStationPageList({ ...params, ...this.pageInfo }).then(result => {
        if (result.isSuccess) {
          // TODO: 列表中的所属组织，目前还是id，等‘最后’把缓存写好之后，再修改此处。特此写下TODO
          this.tableData = result.data.records
          this.pageTotal = parseInt(result.data.total)
        }
      })
    },
    // 新增或者修改成功
    onSuccess () {
      const searchCondition = this.$refs.searchCondition.searchCondition
      this.doSearch(searchCondition)
    },
    // 打开弹窗
    openDialog (type, row) {
      this.type = type
      this.$refs.editDialog.open(type, row)
    }
  },
  created () {
    this.doSearch({})
  },
  mounted () {
    const vm = this
    userCenterApi.getAllDepart({}).then(result => {
      if (result.isSuccess) {
        vm.$refs['searchCondition'].departList = result.data
        vm.$refs['editDialog'].departList = result.data
      }
    })
  }
}
</script>
