<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="字典项">
        <el-input v-model="searchCondition.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onCreate">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      empty-text="暂无数据"
      ref="myTable"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'id'}">
      <el-table-column
        prop="code"
        label="字典编码"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="字典项"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="onAddItem(scope.row)" size="small">新增</el-button>
          <el-button type="primary" @click="onUpdate(scope.row)" size="small">修改</el-button>
          <el-button type="primary" @click="onDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dict-edit ref="dictEdit"></dict-edit>
    <dict-item-edit ref="dictItemEdit"></dict-item-edit>
    <el-pagination
      v-if="pagination.total > 0"
      :total="pagination.total"
      :page.sync="pagination.listQuery.pageNum"
      :limit.sync="pagination.listQuery.pageSize"
      @pagination="onSearch(pagination.listQuery,searchValue)">
    </el-pagination>
  </div>
</template>
<script>
import dictApi from '@/api/DictApi.js'
import dictEdit from './DictEditDialog.vue'
import dictItemEdit from './DictItemEditDialog.vue'
export default {
  components: {
    dictEdit,
    dictItemEdit
  },
  data () {
    return {
      // 提交状态
      loading: false,
      form: {},
      opeType: 'detail',
      tableData: [],
      searchCondition: {
      },
      pagination: {
        // 分页数据
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 10
        }
      }
    }
  },
  computed: {
    isDisabled () {
      return ['delete', 'detail'].includes(this.opeType)
    }
  },
  created () {
    this.resetForm()
    this.onSearch()
  },
  methods: {
    onSearch () {
      let jsonData
      this.pagination.listQuery = {
        pageNum: 1,
        pageSize: 10
      }
      if (this.searchCondition) {
        jsonData = {
          ...this.searchCondition,
          ...this.pagination.listQuery
        }
      } else {
        jsonData = {
          ...this.pagination.listQuery
        }
      }
      dictApi.getDictPageList(jsonData).then(res => {
        if (res.isSuccess) {
          this.tableData = res.data.records
          this.pagination.total = parseInt(res.data.total)
        }
      })
    },
    onCreate () {
      this.openDialog('dictEdit', {}, 'add')
    },
    onUpdate (data) {
      localStorage.setItem(data.id, JSON.stringify(data))
      if (data.dictionaryId) {
        this.openDialog('dictItemEdit', data, 'edit')
      } else {
        this.openDialog('dictEdit', data, 'edit')
      }
    },
    onAddItem (data) {
      this.openDialog('dictItemEdit', data, 'add')
    },
    resetForm () {
      this.form = {
        code: '',
        name: '',
        parentName: '',
        parentId: '',
        describe: ''
      }
    },
    async onSubmit () {
      const vm = this
      vm.loading = true
      const { id, code, name, parentId, parentName, describe } = vm.form
      let result = null
      const params = {
        code,
        name,
        parentId,
        parentName,
        describe
      }
      if (vm.opeType === 'add') {
        result = await dictApi.addDictItem(params)
        if (result.isSuccess) {
          vm.$message.success('保存成功')
        }
      } else if (vm.opeType === 'edit') {
        result = await dictApi.updatDictItem({
          id,
          ...params
        })
        if (result.isSuccess) {
          vm.$message.success('修改成功')
        }
      }
      if (result.isSuccess) {
        vm.$message.success('保存成功')
        vm.resetForm()
      }
      vm.loading = false
    },
    async getDictItemsPageList (codes) {
      let result = await dictApi.getDictItemsPageList(codes)
      if (result.isSuccess) {
        this.tableData = result.data.records
      }
    },
    // 打开编辑、新增弹窗
    openDialog (dialogRef, row, type) {
      if (type) this.opeType = type
      this.$refs[dialogRef].open(row, type)
    },
    onDelete (data) {
      const vm = this
      vm.$confirm('确定删除此项菜单吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            vm.resetForm()
            vm.opeType = 'delete'
            if (data.dictionaryId) {
              dictApi.delDictItem(data.id).then(res => {
                if (res.isSuccess) {
                  vm.deleteChild(data.dictionaryId, data.id)
                  vm.$message.success('删除成功')
                }
              })
            } else {
              dictApi.delDict(data.id).then(res => {
                if (res.isSuccess) {
                  vm.$message.success('删除成功')
                  vm.onSearch()
                }
              })
            }
          }
        }
      })
    },
    load (tree, treeNode, resolve) {
      dictApi.getDictItemsPageList(tree.code).then(res => {
        if (res.isSuccess) {
          resolve(res.data.records)
        }
      })
    },
    refreshChild (key, data, row) {
      const _children = this.$refs['myTable'].store.states.lazyTreeNodeMap[key]
      if (_children) {
        _children.push(data)
      } else {
        this.$refs['myTable'].store.loadOrToggle(row)
      }
    },
    deleteChild (key, data) {
      this.$refs['myTable'].store.states.lazyTreeNodeMap[key].forEach((element, index, arr) => {
        if (element.id === data) {
          arr.splice(index, 1)
        }
      })
    },
    afterCancle (key, data) {
      if (key === data) {
        const _data = this.tableData
        _data.forEach((element, index) => {
          if (element.id === data) {
            const _local = JSON.parse(localStorage.getItem(data))
            const _old = _data[index]
            Reflect.ownKeys(_old).forEach((current) => {
              if (_old[current] !== _local[current]) {
                _old[current] = _local[current]
              }
            })
            localStorage.removeItem(data)
          }
        })
      } else {
        this.$refs['myTable'].store.states.lazyTreeNodeMap[key].forEach((element, index, arr) => {
          if (element.id === data) {
            const _data = JSON.parse(localStorage.getItem(data))
            const _old = arr[index]
            Reflect.ownKeys(_old).forEach((current) => {
              if (_old[current] !== _data[current]) {
                _old[current] = _data[current]
              }
            })
            localStorage.removeItem(data)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.menu-manage{
  height: 100%;
  display: flex;
  .el-card{
    min-height: 100%;
  }
  .tree-area{
    min-width: 230px;
  }
  .edit-area{
    //max-width: 880px;
    width: 100%;
    padding-left: 10px;
  }
}
</style>
