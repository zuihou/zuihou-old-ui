<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible">
    <el-form :model="form" :rules="formRule" ref="form">
      <el-form-item label="编码" prop="code" :label-width="formLabelWidth">
        <el-input autocomplete="off" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
        <el-input autocomplete="off" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input autocomplete="off" v-model="form.describe"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancle">取 消</el-button>
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
        form: {},
      loading: false,
      opeType: 'detail',
      dialogTitle: '',
      formRule: {
          code: [{required: true, message: '不能为空', trigger: 'blur'}],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
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
          this.form.parentId = 0
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
        this.$refs['form'].validate(valid => {
        const vm = this
        if (valid) {
          vm.loading = true
          const { id, code, name, parentId, parentName, describe } = vm.form
          const params = {
            code,
            name,
            parentId,
            parentName,
            describe
          }
          if (vm.opeType === 'add') {
            dictApi.addDict(params).then(result => {
              if (result.isSuccess) {
                this.$parent.tableData.push(result.data)
                this.visible = false
              }
            })
          } else if (vm.opeType === 'edit') {
              dictApi
                  .updatDict({
                      id,
                      ...params
                  })
                  .then(result => {
                      if (result.isSuccess) {
                          this.visible = false
                      }
                  })
          }
        }
        vm.loading = false
      })
    }
  }
}
</script>
