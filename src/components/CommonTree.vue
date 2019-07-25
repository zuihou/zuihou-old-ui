<template>
  <div class="common-tree">
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="true"
      @check-change="checkChange"
      @node-click="nodeClick"
      @current-change="currentChange">
      <span class="dept-tree-node" slot-scope="{ data, node }">
        <span style="margin-right: 15px;">{{ data.name }}</span>
        <template v-if="data.id !== '0'">
          <span class="ope-btn" title="添加" @click="modify('onAdd', data)">
            <i class="el-icon-plus" />
          </span>
          <span class="ope-btn" title="修改" @click="modify('onEdit', data)">
            <i class="el-icon-edit" />
          </span>
          <span class="ope-btn ope-btn-remove" title="删除" @click="modify('onDelete', data, node)" v-if="!data.children">
            <i class="el-icon-delete" />
          </span>
          <span class="ope-btn ope-btn-disable" title="禁用" @click="modify('onDelete', data, node)" v-if="!data.children">
            <i class="el-icon-remove-outline" />
          </span>
        </template>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  methods: {
    modify (type, data, node) {
      window.event.stopPropagation()
      this.$emit(type, data, node)
    },
    checkChange (data, checked, childrenChecked) {
      this.$emit('checkChange', data, checked, childrenChecked)
    },
    nodeClick (data, node) {
      this.$emit('nodeClick', data, node)
    },
    currentChange (data, node) {
      this.$emit('currentChange', data, node)
    }
  }
}
</script>
<style lang="less">
.common-tree{
  .el-tree-node__content{
    height: 28px;
    .dept-tree-node{
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      .ope-btn{
        padding: 0 5px;
        display: none;
        vertical-align: middle;
        border: 1px solid #606266;
        border-radius: 5px;
        height: 26px;
        line-height: 26px;
        box-sizing: border-box;
        margin-top: -1px;
        margin-right: 5px;
        &:hover{
          border-color: #409EFF;
          color: #409EFF;
        }
        &.ope-btn-remove:hover{
          border-color: #F56C6C;
          color: #F56C6C;
        }
        &.ope-btn-disable:hover{
          border-color: #E6A23C;
          color: #E6A23C;
        }
      }
    }
    &:hover{
      .ope-btn{
        display: inline-block;
      }
    }
  }
}
</style>
