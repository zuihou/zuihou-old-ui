<template>
  <el-card>
    <searchCondition @onCreate="openDialog('editDialog', null, 'create')" @onSearch="preSearch"
                     ref="searchCondition"></searchCondition>
    <el-table :data="tableData.records" border style="width: 100%">
      <el-table-column prop="eurekaCode" label="服务id" width="250"></el-table-column>
      <el-table-column prop="name" label="服务名称" minWidth="80"></el-table-column>
      <el-table-column prop="describe" label="服务描述" width="80"></el-table-column>
      <el-table-column prop="swaggerUrl" label="接口地址" width="300"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="190"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onParse(scope.row)">解析接口</el-button>
          <router-link :to="'/developerManageModule/apiView'">
            <el-button size="small" type="text">
              查看接口
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination :limit.sync="pageInfo.pageSize" :page.sync="pageInfo.pageNo"
                :total="parseInt(tableData.total)" @pagination="onSuccess" v-show="tableData.total > 0"/>
  </el-card>
</template>
<script>
    import searchCondition from './service/SearchCondition'
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination'

    export default {
  components: {
    searchCondition,
    Pagination
  },
  computed: {
    ...mapState('developerManageModule', {
      tableData: state => state.microServicePageListData
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
    onParse (row) {
      this.$store.dispatch('developerManageModule/microServiceParse', {
        'ids[]': row.id
      })
    },
    doSearch (params = {}) {
      this.$store.dispatch('developerManageModule/getMicroServicePageList', {
        ...params,
        ...this.pageInfo
      })
    },
    // 新增或者修改成功
    onSuccess () {
      const searchCondition = this.$refs.searchCondition.getCondition()
      this.doSearch(searchCondition)
    },
    openDialog (dialogRef, row, type) {
      // 页面跳转
      // if (type) this.type = type
      // if (row) this.$store.commit('SET_MICRO_SERVICE_INFO', row)
      // this.$refs[dialogRef].open()
    }
  },
  created () {
    this.doSearch()
  }
}
</script>
