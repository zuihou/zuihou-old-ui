<template>
  <div class="menu-manage">
    <div class="tree-area">
      <el-card>
        <commonTree :treeData="treeData" @nodeClick="onNodeClick" @onAdd="onAdd" @onEdit="onEdit" @onDelete="onDelete"></commonTree>
      </el-card>
    </div>
    <div class="edit-area">
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="code" label="编码" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="describe" label="描述" align="center"></el-table-column>
        <el-table-column prop="createUser" label="创建人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateUser" label="更新人" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog('dictItemEdit', scope.row, 'add')">新增</el-button>
            <el-button type="text" size="small" @click="openDialog('dictItemEdit', scope.row, 'edit')">编辑</el-button>
            <el-button type="text" size="small" @click="onDeleteItem(scope.row)">删除</el-button>
            <!-- <el-button type="text" size="small" @click="openDialog('editDialog', scope.row, 'copy')">复制</el-button> -->
          </template>
        </el-table-column>
    </el-table>
    <dict-edit ref="dictEdit" :type="opeType"></dict-edit>
    <dict-item-edit ref="dictItemEdit" :type="opeType"></dict-item-edit>
    <!-- <editDialog ref="editDialog" @onSuccess="onSuccess" :type="type"></editDialog>
    <userDialog ref="userDialog" @onSuccess="onSuccess" :type="type"></userDialog>
    <authDialog ref="authDialog" @onSuccess="onSuccess" :type="type"></authDialog> -->
    </div>
  </div>
</template>
<script>
import commonTree from '@/components/CommonTree.vue'
import dictApi from '@/api/DictApi.js'
import dictEdit from './DictEditDialog.vue'
import dictItemEdit from './DictItemEditDialog.vue'
export default {
  components: {
    commonTree,
    dictEdit,
    dictItemEdit
  },
  data () {
    return {
      // 提交状态
      // loading: false,
      form: {},
      treeData: [],
      opeType: 'detail',
      formLabelWidth: '80px',
      currentData: {},
      currentNode: {},
      tableData: []
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
    // 获取所有字典项树结构
    async getAllDict () {
      const res = await dictApi.getDictPageList()
      if (res.isSuccess) {
        this.treeData = [{
          name: '字典项',
          id: '0',
          children: res.data
        }]
      }
    },
    // 点击非操作项时才会触发
    onNodeClick (data, node) {
      this.resetForm()
      this.tableData = []
      if (data.id === '0') return
      this.getDictItemsPageList(data.code)
      // this.opeType = 'detail'
      // this.form = {
      //   ...data,
      //   parentName: (node.parent && node.parent.data.name) || '无'
      // }
    },
    onAdd (data) {
      this.currentData = data
      // this.resetForm()
      // this.form.parentName = data.name
      // this.form.parentId = data.id
      // this.opeType = 'add'
      this.openDialog('dictEdit', data, 'add')
    },
    onEdit (data, node) {
      this.currentData = data
      this.currentNode = node
      // this.resetForm()
      // this.opeType = 'edit'
      // this.form = {
      //   ...data,
      //   parentName: node.parent.data.name
      // }
      data.parentName = node.parent.data.name
      data.parentId = node.parent.data.id
      this.openDialog('dictEdit', data, 'edit')
    },
    onDelete (data, node) {
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
                const parent = node.parent
                const children = parent.data.children
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
              }
            })
          }
        }
      })
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
          if (!vm.currentData.children) {
            vm.$set(vm.currentData, 'children', [])
          }
          vm.currentData.children.push(result.data)
        }
      } else if (vm.opeType === 'edit') {
        result = await dictApi.updatDictItem({
          id,
          ...params
        })
        if (result.isSuccess) {
          const parent = vm.currentNode.parent
          const children = parent.data.children
          const index = children.findIndex(d => d.id === vm.currentData.id)
          children.splice(index, 1, result.data)
          // vm.currentData = result.data
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
    switchDict (type, data) {
      if (type === 'add') {
        if (!this.currentData.children) {
          this.$set(this.currentData, 'children', [])
        }
        this.currentData.children.push(data)
      } else {
        const parent = this.currentNode.parent
        const children = parent.data.children
        const index = children.findIndex(d => d.id === this.currentData.id)
        children.splice(index, 1, data)
      }
    },
    // 打开编辑、新增弹窗
    openDialog (dialogRef, row, type) {
      if (type) this.opeType = type
      this.$refs[dialogRef].open(row, type)
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
