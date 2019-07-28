<template>
  <div class="dept-manage">
    <div class="tree-area">
      <el-card>
        <commonTree :treeData="treeData" @onAdd="onAdd" @onEdit="onEdit" @onDelete="onDelete"></commonTree>
      </el-card>
    </div>
    <div class="edit-area">
      <el-card>
        <el-form :model="form">
          <div class="form-group">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="简称" :label-width="formLabelWidth">
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
              <el-switch
                v-model="form.status"
                active-color="#13ce66"
                :disabled="isDisabled">
              </el-switch>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
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
import commonTree from '@/components/CommonTree.vue'
import userCenterApi from '@/api/UserCenterApi.js'
export default {
  components: {
    commonTree
  },
  data () {
    return {
      form: {},
      treeData: [{
        name: '根节点',
        id: '0'
      }],
      opeType: 'detail',
      formLabelWidth: '80px'
    }
  },
  computed: {
    isDisabled () {
      return ['delete', 'detail'].includes(this.opeType)
    }
  },
  created () {
    this.resetForm()
    // this.$store.dispatch('userCenterModule/getDeptTreeData', {})
  },
  methods: {
    onAdd (data) {
      this.form.parentName = data.name
      this.form.parentId = data.id
      this.opeType = 'add'
    },
    onEdit (data) {
      this.opeType = 'edit'
    },
    onDelete (data) {
      this.opeType = 'delete'
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
      const { abbreviation, describe, name, parentId, sortValue, status } = vm.form
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
        vm.resetForm()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dept-manage{
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
