<template>
  <el-dialog :title='type | dialogTitle' :visible.sync='visible'>
    <el-form :model='form' ref='roleForm' :rules='rules'>
      <el-form-item label='文件夹名称' prop='submittedFileName' :label-width='formLabelWidth'>
        <el-input v-model='form.submittedFileName' autocomplete='off'></el-input>
      </el-form-item>
    </el-form>
    <div slot='footer' class='dialog-footer'>
      <el-button @click='visible = false'>取 消</el-button>
      <el-button type='primary' @click='preSave'>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import fileCenterApi from '@/api/FileCenterApi.js'
import { debuglog } from 'util'
export default {
  props: {
    // 操作类型
    type: {
      type: String,
      validator (value) {
        return ['create', 'edit'].includes(value)
      },
      default: 'create'
    },
    folderId: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      visible: false,
      formLabelWidth: '100px',
      form: {
        folderId: '0'
      },
      rules: {
        submittedFileName: [{ required: true, message: '文件夹名称不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    open (row) {
      this.visible = true
      if (row) {
        this.form = row
      }
    },
    preSave () {
      const vm = this
      debugger
      vm.$refs.roleForm.validate(valid => {
        if (valid) {
          if (vm.type === 'update') {
            fileCenterApi.updateFolder(vm.form).then(res => {
              if (res.isSuccess) {
                vm.$message.success('修改成功')
                vm.visible = false
                vm.$emit('onSuccess')
              } else {
                vm.$message.error(res.msgs)
              }
            })
          } else {
            fileCenterApi.saveFolder(vm.form).then(res => {
              if (res.isSuccess) {
                vm.$message.success('新增成功')
                vm.visible = false
                vm.$emit('onSuccess')
              } else {
                vm.$message.error(res.msgs)
              }
            })
          }
        }
      })
    }
  }
}
</script>
