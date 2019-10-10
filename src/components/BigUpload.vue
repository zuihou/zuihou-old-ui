<template>
  <el-dialog :title='modalTitle' @on-cancel='closeFun' width='70%' :visible='showModal'>
    <div id='uploader'>
      <div class='back-tip'>
        <i class='el-icon-upload' size='52' style='color: #3399ff'></i>可拖拽本地文件至此
      </div>
      <ul id='theList' style='list-style-type:none'></ul>
      <div id='picker'>选择文件</div>
      <el-button type='info' @click='doUpload' size='default'>全部上传</el-button>
    </div>

    <div slot='footer'>
      <el-button class='modalBtn' type='default' @click='closeFun' size='large'>关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
var userInfo = { md5: '' } // 用户会话信息
var chunkSize = 5 * 1000 * 1024 // 分块大小
var uniqueFileName = null // 文件唯一标识符

export default {
  name: 'bigUpload',
  props: {
    token: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: String,
      default: null
    },
    url: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: String,
      default: '/api/file/file/'
    },
    fileSingleSizeLimit: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: Number,
      default: 500
    },
    folderId: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: String,
      default: '0'
    }
  },
  data () {
    const vm = this
    return {
      showModal: false,
      modalTitle: '大文件上传',
      uploader: null
    }
  },
  mounted () {
    const vm = this
  },
  methods: {
    open () {
      this.showModal = true
      if (!this.uploader) {
        this.$nextTick(function () {
          this.uploadModel()
        })
      } else {
        this.uploader.options.formData.folderId = this.folderId
      }
    },
    closeFun () {
      this.uploader.reset()
      $('#theList').html('')
      this.showModal = false
    },
    doUpload () {
      var list = $('#theList >li')
      for (var i = 0; i < list.length; i++) {
        var id = list[i].id
        var elm = $('#' + id).children('.li-group').children('.itemUpload')
        if (elm.css('display') == 'block') {
          elm.click()
        }
      }
    },
    getUrl (uri) { // 测试用，根据不同类型的后端返回对应的请求地址
      return this.url + uri
    },
    getHeaders () {
      return {
        token: this.token || this.$store.state.token
      }
    },
    UploadComlate (file) {
      $('#' + file.id + ' .percentage').text('上传完毕')
      $('#' + file.id + ' .percentage').addClass('percentage-style')
      var parent = $('#' + file.id + ' .percentage').parent()
      parent.children('.itemStop').hide()
      parent.children('.itemUpload').hide()
      parent.children('.itemDel').hide()
      this.uploader.removeFile(file) // 从上传文件列表中删除

      this.$emit('page')
    },
    uploadModel () {
      const vm = this
      WebUploader.Uploader.register({
        'before-send-file': 'beforeSendFile', // 时间点1：所有分块进行上传之前调用此函数 ，检查文件存不存在
        'before-send': 'beforeSend', // 时间点2：如果有分块上传，则每个分块上传之前调用此函数  ，判断分块存不存在
        'after-send-file': 'afterSendFile' // 时间点3：分片上传完成后，通知后台合成分片
      }, {
        beforeSendFile: function (file) {
          // 秒传验证
          var task = new $.Deferred()
          var start = new Date().getTime()
          var a = new WebUploader.Uploader()
          a.md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
            console.log(percentage)
          }).then(function (val) {
            console.log('总耗时: ' + ((new Date().getTime()) - start) / 1000)
            // md5Mark = val
            userInfo.md5 = val
            uploader.options.formData['md5'] = val
            uploader.options.formData['ext'] = file.ext
            $.ajax({
              type: 'POST',
              url: vm.getUrl('md5Check'),
              data: {
                md5: val,
                folderId: vm.folderId || -1
              },
              headers: vm.getHeaders(),
              async: false, // 同步
              cache: false,
              dataType: 'json'
            }).then(function (data, textStatus, jqXHR) {
              console.log(data)
              if (data.isSuccess) {
                if (data.data) { // 若存在，这返回失败给WebUploader，表明该文件不需要上传
                  task.reject() // 分片存在，跳过
                  uploader.skipFile(file)
                  vm.UploadComlate(file)
                } else {
                  task.resolve() // 分块不存在或不完整，重新发送该分块内容
                  // 拿到上传文件的唯一名称，用于断点续传  需要确保前后端的md5算法和参数一致
                  uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size)
                }
              } else {
                task.reject() // 报错， 跳过
                alert(data.msg)
              }
            }, function (jqXHR, textStatus, errorThrown) { // 任何形式的验证失败，都触发重新上传
              task.resolve()
              // 拿到上传文件的唯一名称，用于断点续传
              uniqueFileName = md5('' + file.name + file.type + file.lastModifiedDate + file.size)
            })
          })
          return $.when(task)
        },
        beforeSend: function (block) {
          // 分片验证是否已传过，用于断点续传
          var task = new $.Deferred()
          $.ajax({
            type: 'POST',
            url: vm.getUrl('chunkCheck'),
            data: JSON.stringify({
              name: uniqueFileName,
              chunkIndex: block.chunk,
              size: block.end - block.start
            }),
            headers: vm.getHeaders(),
            cache: false,
            dataType: 'json',
            contentType: 'application/json'
          }).then(function (data, textStatus, jqXHR) {
            if (data.isSuccess) {
              if (data.data) { // 若存在，返回失败给WebUploader，表明该分块不需要上传
                task.reject()
              } else {
                task.resolve()
              }
            } else {
              task.reject() // 报错， 跳过
              alert(data.msg)
            }
          }, function (jqXHR, textStatus, errorThrown) { // 任何形式的验证失败，都触发重新上传
            task.resolve()
          })
          return $.when(task)
        },
        afterSendFile: function (file) {
          var chunksTotal = 0
          if ((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
            // 合并请求
            var task = new $.Deferred()
            $.ajax({
              type: 'POST',
              url: vm.getUrl('chunksMerge'),
              data: JSON.stringify({
                name: uniqueFileName,
                chunks: chunksTotal,
                ext: file.ext,
                md5: userInfo.md5,
                submittedFileName: file.name,
                contextType: file.type,
                size: file.size,
                folderId: vm.folderId || -1
              }),
              headers: vm.getHeaders(),
              cache: false,
              async: false, // 同步
              dataType: 'json',
              contentType: 'application/json'
            }).then(function (data, textStatus, jqXHR) {
              if (data.isSuccess) {
                task.resolve()
                vm.UploadComlate(file)
              } else {
                task.reject() // 报错， 跳过
                vm.$Message.error(data.msg)
              }
            }, function (jqXHR, textStatus, errorThrown) {
              task.reject()
            })
            return $.when(task)
          } else {
            vm.UploadComlate(file)
          }
        }
      })
      var uploader = WebUploader.create({
        swf: 'Uploader.swf',
        server: vm.getUrl('chunkUpload'),
        pick: '#picker',
        resize: false,
        dnd: '#theList',
        paste: document.body,
        disableGlobalDnd: true,
        thumb: {
          width: 20,
          height: 20,
          quality: 70,
          allowMagnify: true,
          crop: true
        },
        compress: false,
        prepareNextFile: true,
        chunked: true,
        chunkSize: chunkSize,
        threads: true,
        multiple: true,
        formData: $.extend(true, {
          folderId: vm.folderId || -1
        }, userInfo),
        // , formData: function(){return $.extend(true, {userId: userId}, userInfo)}
        headers: vm.getHeaders(),
        // , fileNumLimit: 1
        fileSingleSizeLimit: vm.fileSingleSizeLimit != null ? vm.fileSingleSizeLimit * 1024 * 1024 : undefined,
        duplicate: true
      })

      uploader.on('fileQueued', function (file) {
        $('#theList').append('<li id="' + file.id + '">' +
          '<div class = "li-group"><img class="itemTitle" /><span class="itemTitle">' + file.name + '</span>' +
          '<span class="itemUpload">上传</span>' +
          '<span class="itemStop" style="color: #e4e4e4">上传</span>' +
          '<span class="itemDel">删除</span>' +
          '<div class="percentage"></div></div>' +
          '</li>')

        var $img = $('#' + file.id).find('img')

        uploader.makeThumb(file, function (error, src) {
          if (error) {
            $img.replaceWith("<span class='cant-play'>不能预览</span>")
          }
          $img.attr('src', src)
        })
      })
      uploader.on('error', function (type) {
        if (type == 'F_DUPLICATE') {
          vm.$Message.info('请不要重复选择文件！')
        } else if (type == 'F_EXCEED_SIZE') {
          var temp = { size: vm.fileSingleSizeLimit * 1024 }
          tranSize(temp)
          vm.$Message.info('上传文件不可超过' + temp.size + '!')
        }
      })

      $('#theList').on('click', '.itemUpload', function () {
        var fileId = $(this).parent().parent().attr('id')
        var file
        uploader.getFiles().forEach(function (o) {
          if (o.id === fileId) {
            file = o
          }
        })
        // console.log(file)
        if (file) {
          uploader.upload(file)
          // "上传"-->"暂停"
          $(this).hide()
          var parent = $(this).parent()
          parent.children('.itemStop').show()
        }
      })
      $('#theList').on('click', '.itemStop', function () {
        // var fileId = $(this).parent().parent().attr("id")
        // var file
        // uploader.getFiles().forEach(function(o){
        //     if (o.id === fileId) {
        //         file = o
        //     }
        // })
        // console.log(file)
        // if (file) {
        //     uploader.stop(file)
        //     //"暂停"-->"上传"
        //     $(this).hide()
        //     var parent = $(this).parent()
        //     parent.children(".itemUpload").show()
        // }
      })
      // todo 如果要删除的文件正在上传（包括暂停），则需要发送给后端一个请求用来清除服务器端的缓存文件
      $('#theList').on('click', '.itemDel', function () {
        uploader.removeFile($(this).parent().parent().attr('id')) // 从上传文件列表中删除
        $(this).parent().remove() // 从上传列表dom中删除
      })

      uploader.on('uploadProgress', function (file, percentage) {
        percentage = (percentage * 100).toFixed(2)
        $('#' + file.id + ' .percentage').text(percentage + '%')
      })
      this.uploader = uploader
    }
  }
}
</script>
<style type="text/css">
.itemDel,
.itemStop,
.itemUpload {
  margin-left: 15px;
  color: blue;
  float: left;
  cursor: pointer;
}

.itemTitle {
  margin-left: 15px;
  float: left;
}

.back-tip {
  top: 50%;
  left: 50%;
  font-size: 25px;
  opacity: 0.5;
  cursor: default;
  position: absolute;
  margin-top: -50px;
  margin-left: -140px;
}

#theList {
  width: 100%;
  height: 200px;
  border: 1px solid #e4e4e4;
  border-radius: 0.5em;
  margin-bottom: 10px;
  overflow: scroll;
}

#theList .itemStop {
  display: none;
}

.li-group {
  display: inline-block;
  margin-top: 10px;
}

.cant-play {
  margin-left: 5px;
  color: #bbbcbd !important;
}

.percentage-style {
  color: #23c461 !important;
}
.percentage {
  margin-left: 5px;
  float: left;
}

.webuploader-container {
  position: relative;
}

.webuploader-element-invisible {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}

.webuploader-pick {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 20px;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
  float: left;
}

.webuploader-pick-hover {
  background: #2db7f5;
}

.webuploader-pick-disable {
  opacity: 0.6;
  pointer-events: none;
}
</style>
