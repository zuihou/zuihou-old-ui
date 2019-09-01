<template>
  <div class="search-condition">
    <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
      <el-form-item label="消息类型">
        <el-select @change="onSearch" class="filter-item" clearable
                   placeholder="消息类型" style="width: 140px" v-model="searchCondition.msgsCenterType">
          <el-option label="全部" value=""/>
          <el-option :key="key" :label="val" :value="key"
                     v-for="(val, key) in enums.MsgsCenterType"/>
        </el-select>
      </el-form-item>
      <el-form-item label="业务来源">
        <el-select @change="onSearch" class="filter-item" clearable
                   placeholder="业务来源" style="width: 140px" v-model="searchCondition.bizType">
          <el-option label="全部" value=""/>
          <el-option :key="key" :label="val" :value="key" v-for="(val, key) in enums.MsgsBizType"/>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input clearable placeholder="标题" v-model="searchCondition.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input clearable placeholder="内容" v-model="searchCondition.content"></el-input>
      </el-form-item>
      <el-form-item label="是否已读">
        <el-select @change="onSearch" class="filter-item" clearable
                   placeholder="是否已读" v-model="searchCondition.isRead">
          <el-option label="全部" value=""/>
          <el-option label="已读" value="true"/>
          <el-option label="未读" value="false"/>
        </el-select>

      </el-form-item>
      <el-form-item class="postInfo-container-item" label="起止时间" label-width="120px">
        <el-date-picker align="right" format="yyyy-MM-dd" placeholder="起止时间" range-separator="至"
                        type="daterange" unlink-panels v-model="rangeDate"
                        value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" class="filter-item" icon="el-icon-search" type="primary">
          查询
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
    export default {
        computed: {
            enums() {
                return this.$store.state.enums
            }
        },
        data() {
            return {
                rangeDate: [],
                searchCondition: {
                    title: '',
                    content: '',
                    isRead: null,
                    bizType: null,
                    msgsCenterType: null,
                    startCreateTime: null,
                    endCreateTime: null
                }
            }
        },
        methods: {
            getCondition() {
                return this.searchCondition
            },
            onSearch() {
                if (this.rangeDate.length > 0) {
                    this.searchCondition.startCreateTime = this.rangeDate[0]
                    this.searchCondition.endCreateTime = this.rangeDate[1]
                }
                this.$emit('onSearch', this.searchCondition)
            }
        }
    }
</script>
<style lang="less" scoped>
  .search-condition {
    margin-bottom: 10px;
  }
</style>
