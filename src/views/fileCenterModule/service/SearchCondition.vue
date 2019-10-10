<template>
  <div class='search-condition'>
    <bigUpload ref='bigUpload' :folderId='folderId' v-on:page='onSearch'></bigUpload>
    <el-form :inline='true' :model='searchCondition' class='demo-form-inline'>
      <el-form-item label='文件类型'>
        <el-select
          @change='onSearch'
          class='filter-item'
          clearable
          placeholder='文件类型'
          style='width: 140px'
          v-model='searchCondition.dataType'
        >
          <el-option label='全部' value />
          <el-option :key='key' :label='val' :value='key' v-for='(val, key) in enums.DataType' />
        </el-select>
      </el-form-item>

      <el-form-item label='名称'>
        <el-input clearable placeholder='名称' v-model='searchCondition.submittedFileName'></el-input>
      </el-form-item>

      <el-form-item class='postInfo-container-item' label='起止时间' label-width='120px'>
        <el-date-picker
          align='right'
          format='yyyy-MM-dd'
          placeholder='起止时间'
          range-separator='至'
          type='daterange'
          unlink-panels
          v-model='rangeDate'
          value-format='yyyy-MM-dd HH:mm:ss'
        />
      </el-form-item>
      <el-form-item>
        <el-button @click='onSearch' class='filter-item' icon='el-icon-search' type='primary'>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          class='filter-item'
          icon='el-icon-upload2'
          action='/api/file/file/upload'
          :headers='uploadHeaders'
          :data='uploadData'
          :on-preview='handlePreview'
          :on-remove='handleRemove'
          :on-success='handleSuccess'
          :before-remove='beforeRemove'
          :before-upload='beforeFileUpload'
          multiple
          :limit='5'
          :on-exceed='handleExceed'
          :file-list='fileList'
        >
          <el-button size='small' type='primary'>上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          @click='bigUploadModal'
          class='filter-item'
          icon='el-icon-upload'
          type='primary'
        >大文件上传</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click='onCreate' class='filter-item' icon='el-icon-plus' type='primary'>新增文件夹</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          @click='onBatchDownload'
          class='filter-item'
          icon='el-icon-download'
          type='primary'
        >批量下载</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click='onBatchDel' class='filter-item' icon='el-icon-delete' type='primary'>批量删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import bigUpload from '@/components/BigUpload'

export default {
  components: {
    bigUpload
  },
  computed: {
    enums () {
      return this.$store.state.enums
    },
    uploadHeaders () {
      return {
        'token': this.$store.state.token
      }
    },
    uploadData () {
      return { folderId: this.folderId }
    }
  },
  data () {
    return {
      folderId: '0',
      rangeDate: [],
      searchCondition: {
        folderId: null,
        submittedFileName: '',
        dataType: null,
        startCreateTime: null,
        endCreateTime: null
      },
      fileList: []
    }
  },
  methods: {
    getCondition () {
      return this.searchCondition
    },
    onSearch () {
      if (this.rangeDate.length > 0) {
        this.searchCondition.startCreateTime = this.rangeDate[0]
        this.searchCondition.endCreateTime = this.rangeDate[1]
      }
      this.$emit('onSearch', this.searchCondition)
    },
    onCreate () {
      this.$emit('onCreate')
    },
    onBatchDel () {
      this.$emit('onBatchDel')
    },
    onBatchDownload () {
      this.$emit('onBatchDownload')
    },
    beforeFileUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('超过20MB的文件请使用大文件上传!')
      }
      return isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (response, file, fileList) {
      if (response.isSuccess) {
        this.$message.success('上传成功')
        this.fileList = []
        this.onSearch()
      } else {
        this.$message.error(response.msgs)
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return true
    },
    bigUploadModal () {
      this.$refs.bigUpload.open()
    }
  }
}
</script>
<style lang="less" scoped>
.search-condition {
  margin-bottom: 10px;
}
</style>
