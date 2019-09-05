<template>
  <div class='msgs-manage createPost-container'>
    <el-form
      :model='form.msgsCenterInfoDTO'
      :rules='validate'
      class='form-container'
      ref='msgsForm'
    >
      <div class='createPost-main-container'>
        <el-row>
          <Warning />
          <el-col :span='24'>
            <el-form-item prop='title' required style='margin-bottom: 40px;'>
              <Mdinput
                :maxlength='100'
                name='name'
                required
                v-model='form.msgsCenterInfoDTO.title'
              >标题</Mdinput>
            </el-form-item>

            <div class='postInfo-container'>
              <el-row>
                <el-col :span='6'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='接收方式'
                    prop='isSingleHandle'
                  >
                    <el-radio-group size='small' v-model='receive'>
                      <el-radio-button label='false'>接收人</el-radio-button>
                      <el-radio-button label='true'>接收角色</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span='10'>
                  <el-form-item
                    :hidden='receive'
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='接收人'
                    prop='userIdList'
                  >
                    <el-select
                      :loading='userLoading'
                      :remote-method='queryUserMethod'
                      filterable
                      multiple
                      placeholder='请输入关键词'
                      remote
                      reserve-keyword
                      v-model='form.userIdList'
                    >
                      <el-option
                        :key='item.id'
                        :label='item.name'
                        :value='item.id'
                        v-for='item in userList'
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :hidden='!receive'
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='接收角色'
                    prop='roleCodeList'
                  >
                    <el-select
                      :loading='roleLoading'
                      :remote-method='queryRoleMethod'
                      filterable
                      multiple
                      placeholder='请输入关键词'
                      remote
                      reserve-keyword
                      v-model='form.roleCodeList'
                    >
                      <el-option
                        :key='item.code'
                        :label='item.name'
                        :value='item.code'
                        v-for='item in roleList'
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class='postInfo-container'>
              <el-row>
                <el-col :span='6'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='业务ID'
                    prop='bizId'
                  >
                    <el-input v-model='form.msgsCenterInfoDTO.bizId'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='10'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='业务类型'
                    prop='bizType'
                  >
                    <el-select placeholder='业务类型' v-model='form.msgsCenterInfoDTO.bizType.code'>
                      <el-option
                        :key='key'
                        :label='val'
                        :value='key'
                        clearable
                        v-for='(val, key) in enums.MsgsBizType'
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='消息类型'
                    prop='msgsCenterType'
                    required
                  >
                    <el-select
                      placeholder='消息类型'
                      v-model='form.msgsCenterInfoDTO.msgsCenterType.code'
                    >
                      <el-option
                        :key='key'
                        :label='val'
                        :value='key'
                        clearable
                        v-for='(val, key) in enums.MsgsCenterType'
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class='postInfo-container'>
              <el-row>
                <el-col :span='6'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='负责人'
                    prop='author'
                  >
                    <el-input v-model='form.msgsCenterInfoDTO.author'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='10'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='连接'
                    prop='url'
                  >
                    <el-input v-model='form.msgsCenterInfoDTO.url'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item
                    :label-width='formLabelWidth'
                    class='postInfo-container-item'
                    label='是否串行'
                    prop='isSingleHandle'
                  >
                    <el-switch
                      :disabled='isDisabled'
                      active-color='#13ce66'
                      v-model='form.msgsCenterInfoDTO.isSingleHandle'
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <el-form-item prop='content' style='margin-bottom: 30px;'>
              <Tinymce :height='400' ref='editor' v-model='form.msgsCenterInfoDTO.content' />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-form-item style='text-align: center;'>
        <el-button :loading='loading' @click='onSubmit' type='primary'>保存</el-button>
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
              vm.$router.push('/msgsCenter/myMsgs')
            } else {
              vm.$message.error(res.msgs)
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
