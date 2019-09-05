<template>
  <el-dialog :title='type | dialogTitle' :visible.sync='visible'>
    <el-form :model='form' ref='roleForm' :rules='rules'>
      <el-form-item label='编码' :label-width='formLabelWidth' prop='code'>
        <el-input v-model='form.code' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='角色名称' :label-width='formLabelWidth' prop='name'>
        <el-input v-model='form.name' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='角色描述' :label-width='formLabelWidth'>
        <el-input v-model='form.describe' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='数据范围' :label-width='formLabelWidth' prop='dsType'>
        <el-select v-model='form.dsType' placeholder='请选择数据范围'>
          <el-option label='全部' value='0'></el-option>
          <el-option label='本级' value='本级'></el-option>
          <el-option label='本级及下级' value='本级及下级'></el-option>
          <el-option label='自定义' value='自定义'></el-option>
          <el-option label='个人' value='个人'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='部门' :label-width='formLabelWidth' prop='dsType'>
        <el-select v-model='form.dsType' placeholder='请选择数据范围'>
          <el-option label='全部' :value='1'></el-option>
          <el-option label='本级' :value='2'></el-option>
          <el-option label='本级及下级' :value='3'></el-option>
          <el-option label='自定义' :value='4'></el-option>
          <el-option label='个人' :value='5'></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot='footer' class='dialog-footer'>
      <el-button @click='visible = false'>取 消</el-button>
      <el-button type='primary' @click='preSave'>确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import authManageApi from '@/api/AuthManageApi.js'
export default {
  props: {
    // 操作类型
    type: {
      type: String,
      validator (value) {
        return ['create', 'detail', 'edit', 'copy'].includes(value)
      },
      default: 'create'
    }
  },
  data () {
    return {
      visible: false,
      formLabelWidth: '80px',
      form: {
        code: 'chongzitest',
        name: '虫子测试',
        describe: '测试新增',
        dsType: 4,
        isEnable: true,
        orgList: [1]
      },
      rules: {
        code: [{ required: true, message: '请填写编码', trigger: 'blur' }],
        name: [{ required: true, message: '填写名称', trigger: 'blur' }],
        dsType: [{ required: true, message: '请选择数据范围', trigger: 'change' }]
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
      vm.$refs.roleForm.validate(valid => {
        if (valid) {
          authManageApi.authRoleAdd(vm.form).then(res => {
            if (res.isSuccess) {
              vm.$message.success('新增成功')
              vm.visible = false
              vm.$emit('onSuccess')
            } else {
              vm.$message.error(res.msgs)
            }
          })
        }
      })
    }
  }
}
</script>
