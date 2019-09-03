<template>
  <el-card>
    <optLogSearchCondition ref="optLogSearchCondition" @onSearch="preSearch">
    </optLogSearchCondition>
    <el-table :data="tableData.records" border v-loading="loading" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requestUri" label="请求地址" minWidth="100"></el-table-column>
      <el-table-column prop="httpMethod.desc" label="请求类型" width="100"></el-table-column>
      <el-table-column prop="requestIp" label="操作IP" width="100"></el-table-column>
      <el-table-column prop="description" label="操作描述" minWidth="100"></el-table-column>
      <el-table-column prop="type.desc" label="日志类型" width="100">
        <template slot-scope="scope">
          <el-badge is-dot class="item"
            :type="(scope.row.type && scope.row.type.code == 'OPT')? 'success':'danger' ">
          </el-badge>
          {{scope.row.type.desc}}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="操作人" width="100"></el-table-column>
      <el-table-column prop="actionMethod" label="请求方法" width="150"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="160"></el-table-column>
      <el-table-column prop="finishTime" label="完成时间" width="160"></el-table-column>
      <el-table-column prop="consumingTime" label="消耗时间" width="80"
        :formatter="consumingTimeForamt">
      </el-table-column>
      <el-table-column prop="ua" label="终端 | 浏览器" width="120" :formatter="uaForamt">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="openDrawer(scope.row)" size="small" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :limit.sync="pageInfo.pageSize" :page.sync="pageInfo.pageNo"
      :total="parseInt(tableData.total)" @pagination="onSuccess" v-show="tableData.total > 0" />

    <el-drawer :visible.sync="drawer" :before-close="closeDrawer" direction="rtl"
      v-model="currentRow">
      <div slot="title" class="clearfix">
        <el-badge is-dot class="item"
          :type="(currentRow.type && currentRow.type.code == 'OPT')? 'success':'danger' ">
        </el-badge>
        {{currentRow.type ? currentRow.type.desc : ''}}
        {{currentRow.requestUri}} - {{currentRow.serviceId}}
      </div>
      <el-scrollbar style="height: 100%;">
        <el-card class="box-card">
          <div class="box-item">
            <span class="field-label">请求头: </span>
            <aside style="margin-top:15px;">
              {{currentRow.hearder}}
            </aside>
          </div>

          <div class="box-item" style="margin-top:15px;">
            <span class="field-label">请求参数: </span>
            <pre style="margin-top:15px;">
              {{currentRow.params}}
            </pre>
          </div>

          <div class="box-item" style="margin-top:15px;">
            <span class="field-label">响应信息: </span>
            <pre style="margin-top:15px;">
              {{ currentRow.result ? JSON.stringify(JSON.parse(currentRow.result), null, 4) : ''}}
            </pre>
          </div>
          <div class="box-item" style="margin-top:15px;">
            <span class="field-label">错误信息: </span>
            <pre style="margin-top:15px;">
              {{currentRow.exDetail}}
            </pre>
          </div>
        </el-card>
      </el-scrollbar>
    </el-drawer>
  </el-card>

</template>

<style scoped>
.item {
  margin-top: 10px;
}
.drawer-item {
  margin-top: 6px;
}
</style>
<script>
import optLogSearchCondition from './service/OptLogSearchCondition'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { readUserAgent } from '@/utils/utils'

export default {
  name: 'OptLog',
  components: {
    optLogSearchCondition,
    Pagination
  },
  computed: {
    ...mapState('developerManageModule', {
      tableData: state => state.optLogPageListData
    })

  },
  data () {
    return {
      drawer: false,
      currentRow: {

      },
      multipleSelection: [],
      loading: false,
      type: 'create',
      pageInfo: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    preSearch (params) {
      this.pageInfo.pageNo = 1
      this.doSearch(params)
    },
    doSearch (params = {}) {
      this.loading = true
      this.$store.dispatch('developerManageModule/getOptLogPageList', {
        ...params,
        ...this.pageInfo
      }).finally(() => {
        this.loading = false
      })
    },
    // 回到第一页
    onSuccess () {
      const searchCondition = this.$refs.optLogSearchCondition.getCondition()
      this.doSearch(searchCondition)
    },
    uaForamt (row, column) {
      let ua = readUserAgent(row.ua)
      return ua.terminal + '  |  ' + ua.browser
    },
    consumingTimeForamt (row, column) {
      return row.consumingTime + ' ms'
    },
    openDrawer (data) {
      this.currentRow = data
      this.drawer = true
    },
    closeDrawer (done) {
      done()
      this.currentRow = {}
    },
    badgeResultStatus () {
      let status = this.currentRow.result ? JSON.parse(this.currentRow.result).code : ''
      let type = status === '0' ? 'success' : 'fail'
      let str = '<el-badge is-dot class="item" type="' + type + '"></el-badge>'
      str += status
      return str
    }

  },
  created () {
    this.doSearch()
  }
}
</script>
