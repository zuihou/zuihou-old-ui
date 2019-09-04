<template>
  <div class="msgs-manage  createPost-container">
    <el-form ref="msgsForm" :model="form.msgsCenterInfoDTO" :rules="validate"
      class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <Warning />
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title" required>
              <Mdinput v-model="form.msgsCenterInfoDTO.title" :maxlength="100" name="name" required>
                标题
              </Mdinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="接收方式" :label-width="formLabelWidth" prop="isSingleHandle"
                    class="postInfo-container-item">
                    <el-radio-group v-model="receive" size="small">
                      <el-radio-button label="false">接收人</el-radio-button>
                      <el-radio-button label="true">接收角色</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :label-width="formLabelWidth" :hidden="receive" label="接收人"
                    prop="userIdList" class="postInfo-container-item">
                    <el-select v-model="form.userIdList" multiple filterable remote reserve-keyword
                      placeholder="请输入关键词" :remote-method="queryUserMethod" :loading="userLoading">
                      <el-option v-for="item in userList" :key="item.id" :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" :hidden="!receive" label="接收角色"
                    prop="roleCodeList" class="postInfo-container-item">
                    <el-select v-model="form.roleCodeList" multiple filterable remote
                      reserve-keyword placeholder="请输入关键词" :remote-method="queryRoleMethod"
                      :loading="roleLoading">
                      <el-option v-for="item in roleList" :key="item.code" :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label-width="formLabelWidth" label="业务ID" prop="bizId"
                    class="postInfo-container-item">
                    <el-input v-model="form.msgsCenterInfoDTO.bizId">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="业务类型" :label-width="formLabelWidth" prop="bizType"
                    class="postInfo-container-item">
                    <el-select placeholder="业务类型" v-model="form.msgsCenterInfoDTO.bizType.code">
                      <el-option :key="key" :label="val" :value="key" clearable
                        v-for="(val, key) in enums.MsgsBizType"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="消息类型" :label-width="formLabelWidth" prop="msgsCenterType"
                    class="postInfo-container-item" required>
                    <el-select placeholder="消息类型"
                      v-model="form.msgsCenterInfoDTO.msgsCenterType.code">
                      <el-option :key="key" :label="val" :value="key" clearable
                        v-for="(val, key) in enums.MsgsCenterType"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label-width="formLabelWidth" label="负责人" prop="author"
                    class="postInfo-container-item">
                    <el-input v-model="form.msgsCenterInfoDTO.author">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="连接" :label-width="formLabelWidth" prop="url"
                    class="postInfo-container-item">
                    <el-input v-model="form.msgsCenterInfoDTO.url">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否串行" :label-width="formLabelWidth" prop="isSingleHandle"
                    class="postInfo-container-item">
                    <el-switch v-model="form.msgsCenterInfoDTO.isSingleHandle"
                      active-color="#13ce66" :disabled="isDisabled">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <el-form-item prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="form.msgsCenterInfoDTO.content" :height="400" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Warning from './service/Warning'
import authManageApi from '@/api/AuthManageApi.js'
import userCenterApi from '@/api/UserCenterApi.js'
import msgsCenterApi from '@/api/MsgsCenterApi.js'
export default {
  components: {
    Warning
  },
  computed: {
    enums () {
      return this.$store.state.enums
    }
  },
  data () {
    return {
      receive: false,
      roleList: [],
      userList: [],
      loading: false,
      roleLoading: false,
      userLoading: false,
      isDisabled: false,
      formLabelWidth: '80px',
      form: {
        msgsCenterInfoDTO: {
          bizType: {
            code: null
          },
          msgsCenterType: {
            code: null
          }
        },
        roleCodeList: [],
        userIdList: []
      },
      validate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '正文不能为空', trigger: 'blur' },
          { min: 1, max: 65535, message: '长度在 1 到 65535 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      const vm = this
      vm.loading = true
      vm.$refs.msgsForm.validate(valid => {
        if (valid) {
          msgsCenterApi.sendMsgs(vm.form).then(res => {
            vm.loading = false
            console.log(res)
            if (res.isSuccess) {
              vm.$message.success('新增成功')
            } else {
              vm.$message.error('新增失败')
            }
          })
        }
      })
    },
    queryUserMethod (keyword) {
      let vm = this
      let data = {
        name: keyword,
        pageNo: 1,
        pageSize: 100
      }
      this.userLoading = true
      userCenterApi.userPage(data).then(res => {
        this.userLoading = false
        if (res.isSuccess) {
          vm.userList = res.data.records
        } else {
          vm.userList = []
        }
      })
    },
    queryRoleMethod (keyword) {
      let vm = this
      let data = {
        name: keyword,
        pageNo: 1,
        pageSize: 100
      }
      this.roleLoading = true
      authManageApi.authRolePage(data).then(res => {
        this.roleLoading = false
        if (res.isSuccess) {
          vm.roleList = res.data.records
        } else {
          vm.roleList = []
        }
      })
    }

  },
  created () {

  }
}

</script>

<style lang="less" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 10px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

aside {
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  a {
    color: #337ab7;
    cursor: pointer;

    &:hover {
      color: rgb(32, 160, 255);
    }
  }
}
</style>
