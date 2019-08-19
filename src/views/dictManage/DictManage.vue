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
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000">
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
        name: ''
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
    this.getAllDict()
  },
  methods: {
    onSearch () {
      dictApi.getDictPageList(this.searchCondition).then(res => {
        if (res.isSuccess) {
          this.tableData = res.data.records
        }
      })
    },
    onCreate () {
      this.openDialog('dictEdit', {}, 'add')
    },
    onUpdate (data) {
      this.openDialog('dictEdit', data, 'edit')
    },
    onAddItem (data) {
      this.openDialog('dictItemEdit', data, 'add')
    },
    // 获取所有字典项树结构
    async getAllDict () {
      const res = await dictApi.getDictPageList()
      if (res.isSuccess) {
        this.tableData = res.data.records
      }
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
            dictApi.delDict(data.id).then(res => {
              if (res.isSuccess) {
                vm.$message.success('删除成功')
              }
            })
          }
        }
      })
    },
    onDeleteItem (data) {
      const vm = this
      vm.$confirm('确定删除此项菜单吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            vm.opeType = 'delete'
            dictApi.delDictItem(data.id).then(res => {
              if (res.isSuccess) {
                vm.$message.success('删除成功')
                vm.getDictItemsPageList(data.code)
              }
            })
          }
        }
      })
    },
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
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
