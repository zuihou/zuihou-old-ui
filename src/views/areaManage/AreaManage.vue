<template>
  <div class="menu-manage">
    <div class="tree-area">
      <el-card>
        <commonTree :treeData="treeData" @nodeClick="onNodeClick" @onAdd="onAdd" @onEdit="onEdit" @onDelete="onDelete"></commonTree>
      </el-card>
    </div>
    <div class="edit-area">
      <el-card>
        <div>
          <el-form :model="form">
            <el-form-item label="*地区名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="地区编码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="地域全称" :label-width="formLabelWidth">
              <el-input v-model="form.fullName" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="经度" :label-width="formLabelWidth">
              <el-input v-model="form.longitude" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth">
              <el-input v-model="form.latitude" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth">
              <el-input v-model="form.level" :disabled="isDisabled"></el-input>
            </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
            <el-button @click="opeType = 'detail'" :disabled="loading">取消</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import commonTree from '@/components/CommonTree.vue'
import areaApi from '@/api/AreaApi.js'
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
      formLabelWidth: '160px',
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
    this.getAllArea()
  },
  methods: {
    // 获取所有字典项树结构
    async getAllArea () {
      const res = await areaApi.getAreaPageList()
      if (res.isSuccess) {
        this.treeData = [{
          name: '字典项',
          id: '0',
          children: res.data.records
        }]
      }
    },
    // 点击非操作项时才会触发
    onNodeClick (data, node) {
      this.resetForm()
      if (data.id === '0') return
      this.opeType = 'detail'
      this.form = {
        ...data
      }
    },
    onAdd (data) {
      this.currentData = data
      this.resetForm()
      this.form.parentCode = data.code
      this.opeType = 'add'
    },
    onEdit (data, node) {
      this.currentData = data
      this.currentNode = node
      this.resetForm()
      this.opeType = 'edit'
      this.form = {
        ...data,
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
            areaApi.delArea(data.id).then(res => {
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
        fullName: '',
        parentCode: '',
        longitude: '',
        latitude: '',
        level: ''
      }
    },
    async onSubmit () {
      const vm = this
      vm.loading = true
      const { id, code, name, fullName, parentCode, longitude, latitude, level } = vm.form
      let result = null
      const params = {
        code,
        name,
        parentCode,
        fullName,
        longitude,
        latitude,
        level
      }
      if (vm.opeType === 'add') {
        result = await areaApi.addArea(params)
        if (result.isSuccess) {
          if (!vm.currentData.children) {
            vm.$set(vm.currentData, 'children', [])
          }
          vm.currentData.children.push(result.data)
        }
      } else if (vm.opeType === 'edit') {
        result = await areaApi.updatArea({
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
    max-width: 300px;
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
