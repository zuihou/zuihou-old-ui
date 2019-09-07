<template>
  <el-dialog :title='type | dialogTitle' :visible.sync='visible'>
    <el-form :model='form' :disabled='disabled' :rules='formRule'>
      <el-form-item label='名称' :label-width='formLabelWidth' prop='name'>
        <el-input v-model='form.name' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='所属组织' :label-width='formLabelWidth' prop='orgId'>
        <el-cascader
          v-model='form.orgId'
          placeholder='所属组织'
          :options='departList'
          :show-all-levels='false'
          :props='optionProps'
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label='排序' :label-width='formLabelWidth'>
        <el-input-number v-model='form.sortValue' :min='1' :max='1000'></el-input-number>
      </el-form-item>
      <el-form-item label='启用' :label-width='formLabelWidth'>
        <el-switch v-model='form.status' active-color='#13ce66'></el-switch>
      </el-form-item>
      <el-form-item label='描述' :label-width='formLabelWidth'>
        <el-input v-model='form.describe' autocomplete='off'></el-input>
      </el-form-item>
    </el-form>
    <div slot='footer' class='dialog-footer'>
      <el-button @click='visible = false'>取 消</el-button>
      <el-button type='primary' @click='onSubmit'>确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import userCenterApi from '@/api/UserCenterApi.js'
export default {
  props: {
    onSuccess: Function
  },
  data () {
    return {
      visible: false,
      formLabelWidth: '80px',
      form: {
        status: true
      },
      disabled: false,
      type: 'create',
      optionProps: {
        value: 'id',
        label: 'name'
      },
      departList: [],
      formRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open (type, row) {
      this.type = type
      this.visible = true
      this.disabled = false
      if (row) {
        this.form = { ...row }
      }
      if (this.type === 'detail') {
        this.disabled = true
      } else if (this.type === 'create') {
        this.form = { 'status': true }
      }
    },
    onSubmit () {
      const vm = this
      vm.loading = true
      const {
        id,
        name,
        orgId,
        sortValue,
        enable,
        describe
      } = vm.form
      const params = {
        id,
        name,
        orgId,
        sortValue,
        enable,
        describe
      }
      if (params.orgId) {
        params.orgId = params.orgId[params.orgId.length - 1]
      }
      if (this.type === 'create') {
        userCenterApi.addStation(params).then(result => {
          if (result.isSuccess) {
            vm.$message.success('保存成功！')
            vm.visible = false
            vm.onSuccess()
          }
        })
      } else if (this.type === 'edit') {
        userCenterApi.updateStation(params).then(result => {
          if (result.isSuccess) {
            vm.$message.success('修改成功！')
            this.visible = false
            vm.onSuccess()
          }
        })
      } else if (this.type === 'detail') {
        this.visible = false
      }
    }
  }
}
</script>
