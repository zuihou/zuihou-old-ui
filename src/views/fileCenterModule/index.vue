<template>
  <el-card>
    <div class='file-breadcrumb'>
      <el-breadcrumb separator-class='el-icon-arrow-right'>
        <el-breadcrumb-item v-for='item in breadcrumbList' :key='item.folderId'>
          <span @click='pageBreadcrumb(item.folderId)'>{{item.submittedFileName}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <searchCondition
      @onSearch='preSearch'
      @onBatchDel='onBatchDel'
      @onBatchDownload='onBatchDownload'
      @onCreate='openDialog("folderDialog", null, "create")'
      ref='searchCondition'
    ></searchCondition>
    <el-table
      :data='tableData.records'
      border
      style='width: 100%'
      @selection-change='handleSelectionChange'
    >
      <el-table-column type='selection' width='55'></el-table-column>
      <el-table-column label='文件名' prop='submittedFileName' minWidth='250'></el-table-column>
      <el-table-column label='类型' prop='dataType.desc' width='100'></el-table-column>
      <el-table-column label='大小' width='200' prop='size'></el-table-column>
      <el-table-column label='所在文件夹' prop='folderName' width='200'></el-table-column>
      <el-table-column label='创建时间' prop='createTime' width='190'></el-table-column>
      <el-table-column fixed='right' label='操作' width='200'>
        <template slot-scope='scope'>
          <el-button @click='onUpdate(scope.row)' icon='el-icon-edit' size='small' type='text'>修改</el-button>
          <el-button
            @click='onDownload(scope.row)'
            icon='el-icon-download'
            size='small'
            type='text'
          >下载</el-button>
          <el-button @click='onDel(scope.row)' icon='el-icon-delete' size='small' type='text'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :limit.sync='pageInfo.pageSize'
      :page.sync='pageInfo.pageNo'
      :total='parseInt(tableData.total)'
      @pagination='onSuccess'
      v-show='tableData.total > 0'
    />
    <folderDialog ref='folderDialog' @onSuccess='onSuccess' :type='type'></folderDialog>
  </el-card>
</template>
<script>
import searchCondition from './service/SearchCondition'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import fileCenterApi from '@/api/FileCenterApi.js'
import folderDialog from './service/FolderDialog'
import config from '@/config'
export default {
  components: {
    searchCondition,
    Pagination,
    folderDialog
  },
  computed: {
    ...mapState('fileCenterModule', {
      tableData: state => state.myFilePageData
    })
  },
  data () {
    return {
      multipleSelection: [],
      breadcrumbList: [
        {
          submittedFileName: '全部文件',
          folderId: null
        }
      ],
      type: 'create',
      pageInfo: {
        pageNo: 1,
        pageSize: 10
      },
      folderId: 0
    }
  },
  methods: {
    pageInit () {
      const vm = this
      vm.tableData = {}
    },
    preSearch (params) {
      this.pageInfo.pageNo = 1
      this.doSearch(params)
    },
    onBatchDownload () {
      this.onDownload()
    },
    onDownload (row) {
      const vm = this
      let ids = []
      if (row) {
        if (row.dataType.code === 'DIR') {
          vm.$message.warning('不允许下载文件夹')
          return
        }
        ids = [row.id]
      } else {
        if (vm.multipleSelection.length <= 0) {
          vm.$message.warning('请先选择文件!')
          return
        }

        let dir = vm.multipleSelection.find(item => item.dataType.code === 'DIR')
        if (dir) {
          vm.$message.warning('不允许下载文件夹')
          return
        }

        ids = vm.multipleSelection.map(item => item.id)
      }

      window.location.href = `${config.apiUrl[process.env.NODE_ENV]}${config.proxyPrefix}${fileCenterApi.downloadFiles.url}?ids[]=${ids.join('&ids[]=')}&token=${this.$store.state.token}`
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    pageBreadcrumb (folderId) {
      let searchCondition = this.$refs.searchCondition.getCondition()
      this.doSearch(searchCondition)
      var index = this.breadcrumbList.findIndex(item => item.folderId === folderId)
      this.breadcrumbList.splice(index + 1, this.breadcrumbList.length - index - 1)
    },
    doSearch (params = {}) {
      this.$store.dispatch('fileCenterModule/getMyFilePageList', {
        ...params,
        ...this.pageInfo
      })
    },
    // 新增或者修改成功
    onSuccess () {
      const searchCondition = this.$refs.searchCondition.getCondition()
      this.doSearch(searchCondition)
    },
    // 修改
    onUpdate (row) {
      this.openDialog('folderDialog', row, 'update')
    },
    // 打开编辑、新增弹窗
    openDialog (dialogRef, row, type) {
      if (type) this.type = type
      // if (row) this.$store.commit('SET_CURRENT_FILE_INFO', row)
      if (!row) {
        row = {
          parentId: this.folderId
        }
      }
      this.$refs[dialogRef].open(row)
    },
    // 删除
    onDel (row) {
      const vm = this
      vm.$confirm('确定删除此文件吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            fileCenterApi.delFile({ ids: [row.id] }).then(res => {
              if (res.isSuccess) {
                vm.$message.success('删除成功')
                vm.doSearch()
              } else {
                vm.$message.error(res.msgs)
              }
            })
          }
        }
      })
    },
    // 删除
    onBatchDel () {
      const vm = this
      if (this.multipleSelection.length <= 0) {
        return
      }
      vm.$confirm('确定删除文件吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            let ids = vm.multipleSelection.map(item => item.id)
            fileCenterApi.delFile({ ids: ids }).then(res => {
              if (res.isSuccess) {
                vm.$message.success('删除成功')
                vm.doSearch()
              } else {
                vm.$message.error(res.msgs)
              }
            })
          }
        }
      })
    }

  },
  created () {
    this.doSearch()
  }
}
</script>

<style lang="less">
.file-breadcrumb {
  margin: 10px 0px 20px;
}
.page {
  text-align: center;
  margin-top: 5px;
}
.button-list {
  margin-right: 10px;
  font-size: 20px !important;
  color: #22a2ed;
  vertical-align: middle;
}
.title {
  color: #777;
  font-size: 2em;
  border-bottom: 1px solid #e5e5e5;
}
</style>
