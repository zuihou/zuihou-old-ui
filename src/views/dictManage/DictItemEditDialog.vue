<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
  >
    <el-form
      :model="form"
      :rules="formRules"
      ref="form"
    >
      <el-form-item
        :label-width="formLabelWidth"
        label="编码"
        prop="code"
      >
        <el-input
          autocomplete="off"
          v-model="form.code"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="名称"
        prop="name"
      >
        <el-input
          autocomplete="off"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="描述"
      >
        <el-input
          autocomplete="off"
          v-model="form.describe"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="父节点"
      >
        <el-input
          disabled
          v-model="form.parentName"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      class="dialog-footer"
      slot="footer"
    >
      <el-button @click="onCancle">取 消</el-button>
      <el-button
        @click="onSubmit"
        type="primary"
      >确 定
      </el-button>
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
          code: [{required: true, message: '不能为空', trigger: 'blur'}],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
        addRow: {}
    }
  },
  methods: {
    onCancle () {
        this.$parent.afterCancle(
            this.form.dictionaryId ? this.form.dictionaryId : this.form.id,
            this.form.id
        )
      this.resetForm()
      this.$refs['form'].clearValidate()
      this.visible = false
    },
    open (row, type) {
      this.visible = true
      if (row) {
        this.opeType = type
        this.resetForm()
        if (type === 'add') {
          this.form.parentName = row.name
          this.form.dictionaryId = row.id
          this.form.dictionaryCode = row.code
          this.dialogTitle = '新增'
          this.addRow = row
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
        this.$refs['form'].validate(valid => {
        if (valid) {
          const vm = this
          vm.loading = true
            const {
                id,
                code,
                dictionaryCode,
                name,
                parentId,
                parentName,
                describe,
                dictionaryId
            } = vm.form
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
                  vm.$parent.refreshChild(
                      res.data.dictionaryId,
                      res.data,
                      vm.addRow
                  )
                this.visible = false
                vm.$message.success('保存成功')
                vm.resetForm()
              }
            })
          } else if (vm.opeType === 'edit') {
              dictApi
                  .updateDictItem({
                      id,
                      ...params
                  })
                  .then(res => {
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
