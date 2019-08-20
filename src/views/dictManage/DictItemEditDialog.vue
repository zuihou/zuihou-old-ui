<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible">
    <el-form :model="form" :rules="formRules" ref="form">
      <el-form-item prop="code" label="编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.describe" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="父节点" :label-width="formLabelWidth">
        <el-input v-model="form.parentName" disabled></el-input>
      </el-form-item>
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
        name: '',
        code: ''
      },
      loading: false,
      opeType: 'detail',
      dialogTitle: '',
      formRules: {
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
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
          this.form.parentName = row.name
          this.form.dictionaryId = row.id
          this.form.dictionaryCode = row.code
          this.dialogTitle = '新增'
        } else {
          this.form = row
          this.form.parentName = row.name
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const vm = this
          vm.loading = true
          const { id, code, dictionaryCode, name, parentId, parentName, describe, dictionaryId } = vm.form
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
            dictApi.addDictItem(params).then(res => {
              if (res.isSuccess) {
                const _parent = vm.$parent
                console.log(_parent.tree)
                console.log(_parent.treeNode)
                if (_parent.tree) {
                  _parent.load(_parent.tree, _parent.treeNode, _parent.resolve)
                }
                this.visible = false
                vm.$message.success('保存成功')
                vm.resetForm()
              }
            })
          } else if (vm.opeType === 'edit') {
            dictApi.updateDictItem({
              id,
              ...params
            }).then(res => {
              if (res.isSuccess) {
                vm.$message.success('修改成功')
                vm.resetForm()
                this.visible = false
              }
            })
          }
          vm.loading = false
        }
      })
    }
  }
}
</script>
