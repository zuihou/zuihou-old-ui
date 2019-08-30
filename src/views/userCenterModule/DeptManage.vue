<template>
  <div class="dept-manage">
    <div class="tree-area">
      <el-tree :data="treeData" ref="departTree" :props="defaultProps" :render-content="renderContent" node-key="id" @click="onview(data)" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag">
      </el-tree>
    </div>
    <div class="edit-area">
      <el-card>
        <el-form ref="dataForm" :model="form" :rules="validate" :validate-on-rule-change="false">
          <div class="form-group">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="简称" :label-width="formLabelWidth" prop="abbreviation">
              <el-input v-model="form.abbreviation" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="父节点" :label-width="formLabelWidth">
              <el-input v-model="form.parentName" disabled></el-input>
            </el-form-item>
          </div>
          <div class="form-group">
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input-number v-model="form.sortValue" :min="1" :max="1000" :disabled="isDisabled"></el-input-number>
            </el-form-item>
            <el-form-item label="启用" :label-width="formLabelWidth">
              <el-switch v-model="form.status" active-color="#13ce66" :disabled="isDisabled">
              </el-switch>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" prop="describe">
              <el-input type="textarea" v-model="form.describe" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
          </div>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="opeType = 'detail'">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import userCenterApi from '@/api/UserCenterApi.js'
import validator from '@/utils/back_validator.js'
export default {
  components: {

  },
  data () {
    return {
      form: {},
      treeData: [{
        name: '根组织',
        id: '0'
      }],
      opeType: 'detail',
      formLabelWidth: '80px',
      validate: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isact: ''
    }
  },
  computed: {
    isDisabled () {
      return ['delete', 'detail'].includes(this.opeType)
    }
  },
  created () {
    this.resetForm()
    this.getValidator()
    this.getAllDepart()
  },
  methods: {
    getValidator () {
      const vm = this
      var apiData = userCenterApi.authorityOrgPost({}, true)
      validator(
        { api: apiData },
        {
          vm: vm,
          validate: vm.validate,
          formName: 'dataForm'
        })
    },
    getAllDepart (data) {
      userCenterApi.getAllDepart().then(res => {
        if (res.isSuccess) {
          this.treeData = res.data
          // this.$set(this.treeData, 'children', res.data);
          // console.log(this.treeData)
        }
      })
    },
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    resetForm () {
      this.form = {
        name: '',
        abbreviation: '',
        parentName: '',
        parentId: '',
        sortValue: 1,
        status: true,
        describe: ''
      }
    },
    async onSubmit () {
      const vm = this
      const { id, abbreviation, describe, name, parentId, sortValue, status } = vm.form
      let result = null
      if (vm.opeType === 'add') {
        result = await userCenterApi.authorityOrgPost({
          abbreviation,
          describe,
          name,
          parentId,
          sortValue,
          status
        })
      } else if (vm.opeType === 'edit') {
        result = await userCenterApi.authorityOrgPut({
          id,
          abbreviation,
          describe,
          name,
          parentId,
          sortValue,
          status
        })
      }
      if (result.isSuccess) {
        vm.$message.success('保存成功')
        const _data = result.data
        let _node = vm.$refs['departTree'].getNode(_data.id)
        let _pnode = vm.$refs['departTree'].getNode(_data.parentId)
        vm.$set(_pnode, 'children', _node)
        vm.resetForm()
      }
    },
    mouseenteract (data) {
      this.isact = data
    },
    mouseleaveact (data) {
      this.isact = ''
    },
    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; padding-right: 8px;" on-mouseenter={() => this.mouseenteract(data)} b on-mouseleave={() => this.mouseleaveact(data)}>
          <span>
            <span>{node.label}</span>
          </span>
          {
            this.isact === data ? <span> <el-button type="text" icon="el-icon-plus" on-click={() => this.append(data)}></el-button> <el-button type="text" icon="el-icon-edit" on-click={() => this.onEdit(data)}></el-button> <el-button type="text" icon="el-icon-delete" on-click={() => this.remove(node, data)}></el-button>     </span> : <span></span>
          }

        </span>
      )
    },
    append (data) {
      this.opeType = 'add'
      if (data.id) {
        this.form.parentName = data.name
        this.form.parentId = data.id
      }
    },
    onEdit (data) {
      this.opeType = 'edit'
      if (data) {
        this.form = data
        this.form.parentName = this.$refs['departTree'].getNode(data.parentId).data.name
      }
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.dept-manage {
  height: 100%;
  display: flex;
  .el-card {
    min-height: 400px;
  }
  .tree-area {
    min-width: 300px;
  }
  .edit-area {
    flex-grow: 1;
    max-width: 880px;
    padding-left: 10px;
    .form-group {
      width: 100%;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
