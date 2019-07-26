<template>
  <div class="menu-manage">
    <div class="tree-area">
      <el-card>
        <commonTree :treeData="treeData" @nodeClick="onNodeClick" @onAdd="onAdd" @onEdit="onEdit" @onDelete="onDelete"></commonTree>
      </el-card>
    </div>
    <div class="edit-area">
      <el-card>
        <el-form :model="form">
          <div class="form-group">
            <el-form-item label="编码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="父节点" :label-width="formLabelWidth">
              <el-input v-model="form.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth">
              <el-input v-model="form.icon" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="路径" :label-width="formLabelWidth">
              <el-input v-model="form.href" :disabled="isDisabled"></el-input>
            </el-form-item>
          </div>
          <div class="form-group">
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input-number v-model="form.sortvalue" :min="1" :max="1000" :disabled="isDisabled"></el-input-number>
            </el-form-item>
            <el-form-item label="分组" :label-width="formLabelWidth">
              <el-input v-model="form.group" :min="1" :max="1000" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-switch
                v-model="form.isEnable"
                active-color="#13ce66"
                :disabled="isDisabled">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否共用" :label-width="formLabelWidth">
              <el-switch
                v-model="form.isPublic"
                active-color="#13ce66"
                :disabled="isDisabled">
              </el-switch>
            </el-form-item>
            <el-form-item label="打开方式" :label-width="formLabelWidth">
              <el-select v-model="form.target" :disabled="isDisabled">
                <el-option label="相同框架" value="SELF"></el-option>
                <el-option label="当前页" value="TOP"></el-option>
                <el-option label="新窗口" value="BLANK"></el-option>
                <el-option label="父窗口" value="PAREN"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.describe" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
          </div>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
            <el-button @click="opeType = 'detail'" :disabled="loading">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import commonTree from '@/components/CommonTree.vue'
import authManageApi from '@/api/AuthManageApi.js'
export default {
  components: {
    commonTree
  },
  data () {
    return {
      // 提交状态
      loading: false,
      form: {},
      treeData: [],
      opeType: 'detail',
      formLabelWidth: '80px',
      currentData: {},
      currentNode: {}
    }
  },
  computed: {
    isDisabled () {
      return ['delete', 'detail'].includes(this.opeType)
    }
  },
  created () {
    this.resetForm()
    this.getAllMenus()
  },
  methods: {
    // 获取所有菜单树结构
    async getAllMenus () {
      const res = await authManageApi.authMenuTree()
      if (res.isSuccess) {
        this.treeData = [{
          name: '系统菜单',
          id: '0',
          children: res.data
        }]
      }
    },
    // 点击非操作项时才会触发
    onNodeClick (data, node) {
      this.resetForm()
      if (data.id === '0') return
      this.opeType = 'detail'
      this.form = {
        ...data,
        target: (data.target && data.target.code) || 'SELF',
        parentName: (node.parent && node.parent.data.name) || '无'
      }
    },
    onAdd (data) {
      this.currentData = data
      this.resetForm()
      this.form.parentName = data.name
      this.form.parentId = data.id
      this.opeType = 'add'
    },
    onEdit (data, node) {
      this.currentData = data
      this.currentNode = node
      this.resetForm()
      this.opeType = 'edit'
      this.form = {
        ...data,
        target: (data.target && data.target.code) || 'SELF',
        parentName: node.parent.data.name
      }
    },
    onDelete (data, node) {
      const vm = this
      vm.$confirm('确定删除此项菜单吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            vm.resetForm()
            vm.opeType = 'delete'
            authManageApi.authMenuDelete(data.id).then(res => {
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
        icon: '',
        href: '',
        sortvalue: 0,
        group: '',
        isEnable: true,
        isPublic: true,
        target: 'SELF',
        describe: ''
      }
    },
    async onSubmit () {
      const vm = this
      vm.loading = true
      const { id, code, name, parentId, icon, href, sortvalue, group, isEnable, isPublic, target, describe } = vm.form
      let result = null
      const params = {
        code,
        name,
        parentId,
        icon,
        href,
        sortvalue,
        group,
        isEnable,
        isPublic,
        target: {
          code: target
        },
        describe
      }
      if (vm.opeType === 'add') {
        result = await authManageApi.authMenuPost(params)
        if (result.isSuccess) {
          if (!vm.currentData.children) {
            vm.$set(vm.currentData, 'children', [])
          }
          vm.currentData.children.push(result.data)
        }
      } else if (vm.opeType === 'edit') {
        result = await authManageApi.authMenuPut({
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
    min-width: 300px;
  }
  .edit-area{
    flex-grow: 1;
    max-width: 880px;
    padding-left: 10px;
    .form-group{
      width: 400px;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
