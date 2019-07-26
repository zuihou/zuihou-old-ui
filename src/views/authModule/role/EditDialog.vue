<template>
  <el-dialog :title="type | dialogTitle" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input-number v-model="form.sort" :min="1" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item label="启用" :label-width="formLabelWidth">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66">
        </el-switch>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
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

      }
    }
  },
  methods: {
    open (row) {
      this.visible = true
      if (row) {
        this.form = row
      }
    }
  }
}
</script>
