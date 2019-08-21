<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="编码" :label-width="formLabelWidth">
        <el-input v-model="form.dictionaryCode" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.describe" autocomplete="off" ></el-input>
      </el-form-item>
      <!-- <el-form-item label="父节点" :label-width="formLabelWidth">
        <el-input v-model="form.parentName" disabled></el-input>
      </el-form-item> -->
    <!-- <el-form-item style="text-align: center;">
      <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
      <el-button @click="opeType = 'detail'">取消</el-button>
    </el-form-item> -->
  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

import dictApi from '@/api/DictApi.js'

export default {
  data () {
    return {
      visible: false,
      formLabelWidth: '80px',
      form: {

      },
      loading: false,
      opeType: 'detail',
      dialogTitle: ''
    }
  },
  methods: {
    open (row, type) {
      this.visible = true
      if (row) {
        this.opeType = type
        this.resetForm()
        if (type === 'add') {
          this.form.parentId = row.id
          this.form.dictionaryId = row.dictionaryId
          this.form.code = row.code
          this.dialogTitle = '新增'
        } else {
          this.form = row
          this.dialogTitle = '修改'
        }
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
      const { id, code, dictionaryCode, name, parentId, parentName, describe, dictionaryId } = vm.form
      let result = null
      const params = {
        code,
        dictionaryCode,
        name,
        parentId,
        parentName,
        describe,
        dictionaryId
      }
      if (vm.opeType === 'add') {
        result = await dictApi.addDictItem(params)
        if (result.isSuccess) {
          // this.$parent.switchDict('add', result.data)
          this.$parent.getDictItemsPageList(this.form.code)
          this.visible = false
          // if (!vm.currentData.children) {
          //   vm.$set(vm.currentData, 'children', [])
          // }
          // vm.currentData.children.push(result.data)
        }
      } else if (vm.opeType === 'edit') {
        result = await dictApi.updateDictItem({
          id,
          ...params
        })
        if (result.isSuccess) {
          // this.$parent.switchDict('edit', result.data)
          this.visible = false
          // const parent = vm.currentNode.parent
          // const children = parent.data.children
          // const index = children.findIndex(d => d.id === vm.currentData.id)
          // children.splice(index, 1, result.data)
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
