<template>
  <el-card>
    <optLogSearchCondition ref="optLogSearchCondition" @onSearch="preSearch"></optLogSearchCondition>
    <el-table :data="tableData.records" border style="width: 100%">
      <el-table-column prop="requestIp" label="操作IP" width="100"></el-table-column>
      <el-table-column prop="description" label="操作描述" minWidth="100"></el-table-column>
      <el-table-column prop="type.desc" label="日志类型" width="80"></el-table-column>
      <el-table-column prop="userName" label="操作人" width="80"></el-table-column>
      <!--      <el-table-column prop="classPath" label="类路径" width=""></el-table-column>-->
      <el-table-column prop="actionMethod" label="请求方法" width=""></el-table-column>
      <el-table-column prop="requestUri" label="请求地址" width=""></el-table-column>
      <el-table-column prop="httpMethod.desc" label="请求类型" width=""></el-table-column>
      <!--      <el-table-column prop="params" label="请求参数" width=""></el-table-column>-->
      <!--      <el-table-column prop="result" label="返回值" width=""></el-table-column>-->
      <!--      <el-table-column prop="exDesc" label="异常详情信息" width=""></el-table-column>-->
      <el-table-column prop="startTime" label="开始时间" width=""></el-table-column>
      <el-table-column prop="finishTime" label="完成时间" width=""></el-table-column>
      <el-table-column prop="consumingTime" label="消耗时间" width=""></el-table-column>
      <!--      <el-table-column prop="ua" label="浏览器" width=""></el-table-column>-->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="onView(scope.row)" size="small" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :limit.sync="pageInfo.pageSize"
      :page.sync="pageInfo.pageNo"
      :total="parseInt(tableData.total)"
      @pagination="onSuccess"
      v-show="tableData.total > 0" />
  </el-card>
</template>
<script>
    import optLogSearchCondition from './service/OptLogSearchCondition'
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination'

    export default {
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
      type: 'create',
      pageInfo: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    preSearch (params) {
      this.pageInfo.pageNo = 1
      this.doSearch(params)
    },
    doSearch (params = {}) {
      this.$store.dispatch('developerManageModule/getOptLogPageList', {
        ...params,
        ...this.pageInfo
      })
    },
    // 回到第一页
    onSuccess () {
      const searchCondition = this.$refs.optLogSearchCondition.getCondition()
      this.doSearch(searchCondition)
    }

  },
  created () {
    this.doSearch()
  }
}
</script>
