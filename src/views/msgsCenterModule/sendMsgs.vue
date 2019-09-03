<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="validate" class="form-container">

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <Mdinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </Mdinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList"
                      filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index"
                        :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>
  </div>
</template>

<script>
import Warning from './service/Warning'
import Mdinput from '@/components/Mdinput'
export default {
  components: {
    Warning, Mdinput
  },
  computed: {

  },
  data () {
    return {
      postForm: {},
      validate: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        abbreviation: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

  },
  created () {

  }
}

</script>
