<template>
  <el-card>
    <searchCondition @onSearch="preSearch" ref="searchCondition"></searchCondition>
    <el-table :data="tableData.records" border style="width: 100%">
      <el-table-column label="序号" prop="index" width="50"></el-table-column>
      <el-table-column label="标题" prop="title" width="250"></el-table-column>
      <el-table-column label="内容" minWidth="200" prop="content"></el-table-column>
      <el-table-column label="是否已读" prop="isRead" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isRead ? 'success' : 'danger'" class="tag-item">
            {{scope.row.isRead ? '已读' : '未读'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="消息类型" prop="msgsCenterType.desc" width="80"></el-table-column>
      <el-table-column label="业务来源" prop="bizType.desc" width="100"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="190"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="onView(scope.row)" icon="el-icon-view" size="small" type="text">
            查看
          </el-button>
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
    import msgsCenterApi from '@/api/MsgsCenterApi.js'

    export default {
        components: {
            searchCondition,
            Pagination
        },
        computed: {
            ...mapState('msgsCenterModule', {
                tableData: state => state.myMsgsPageData
            })
        },
        data() {
            return {
                type: 'create',
                pageInfo: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            preSearch(params) {
                this.pageInfo.pageNo = 1
                this.doSearch(params)
            },
            onView(row) {
                const vm = this
                if (!row.isRead) {
                    msgsCenterApi.markMsgs({msgCenterIds: [row.id, 123]}).then(res => {
                        if (res.isSuccess) {
                            this.onHref(row)
                        }
                    })
                } else {
                    this.onHref(row)
                }
            },
            onHref(row) {
                if (row.handlerUrl) {
                    let url = row.handlerUrl;
                    if (url.indexOf('?') > 0) {
                        url += '?'
                    }
                    url += row.handlerParams;
                    // 这里需要根据情况，跳转到外部链接， 或者内部链接
                    window.location.href = url;
                }
            },
            doSearch(params = {}) {
                this.$store.dispatch('msgsCenterModule/getMyMsgsPageList', {
                    ...params,
                    ...this.pageInfo
                })
            },
            // 新增或者修改成功
            onSuccess() {
                const searchCondition = this.$refs.searchCondition.getCondition()
                this.doSearch(searchCondition)
            }
        },
        created() {
            this.doSearch()
        }
    }
</script>
