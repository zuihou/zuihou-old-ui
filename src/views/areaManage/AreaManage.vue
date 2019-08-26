<template>
  <div class="search-condition">
    <el-form
      :inline="true"
      :model="searchCondition"
      class="demo-form-inline"
    >
      <el-form-item label="关键字">
        <el-input
          placeholder="名称"
          v-model="searchCondition.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="onSearch"
          type="primary"
        >查询
        </el-button>
        <el-button
          @click="onCreate"
          type="primary"
        >新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="code"
      border
      lazy
      empty-text="暂无数据"
      ref="myTable"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'code'}"
    >
      <el-table-column
        align="center"
        label="地域编码"
        prop="code"
      ></el-table-column>
      <el-table-column
        align="center"
        label="地域名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        align="center"
        label="地域全称"
        prop="fullName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="级别"
        prop="level"
      ></el-table-column>
      <el-table-column
        align="center"
        label="经度"
        prop="longitude"
      ></el-table-column>
      <el-table-column
        align="center"
        label="纬度"
        prop="latitude"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            @click="onAdd(scope.row)"
            size="small"
            type="primary"
          >新增
          </el-button>
          <el-button
            @click="onUpdate(scope.row)"
            size="small"
            type="primary"
          >修改
          </el-button>
          <el-button
            @click="onDelete(scope.row)"
            size="small"
            type="primary"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <area-edit ref="areaEdit"></area-edit>
  </div>
</template>
<script>
import areaApi from '@/api/AreaApi.js'
import areaEdit from './AreaEdit'

export default {
  components: {
    areaEdit
  },
  data () {
    return {
      // 提交状态
      loading: false,
      form: {},
      opeType: 'detail',
      tableData: [],
      formLabelWidth: '160px',
      searchCondition: {
        name: ''
      }
    }
  },
  computed: {
    isDisabled () {
      return ['delete', 'detail'].includes(this.opeType)
    }
  },
  created () {
    this.getAllArea({ parentCode: '-1' })
  },
  methods: {
    onSearch () {
      let _search = {}
      const searchName = this.searchCondition.name
      if (!searchName) {
        _search = { parentCode: '-1' }
      } else {
        _search = this.searchCondition
      }
      const vm = this
      areaApi.getAreaList(_search).then(res => {
        if (res.isSuccess) {
          vm.tableData = res.data
        }
      })
    },
    onCreate () {
      this.openDialog('areaEdit', {}, 'add')
    },
    onDelete (data) {
      const vm = this
      vm.$confirm('确定删除此项菜单吗？', {
        title: '删除确认',
        callback (action) {
          if (action === 'confirm') {
            areaApi.delArea(data.id).then(res => {
              if (res.isSuccess) {
                vm.$message.success('删除成功')
                if (data.parentCode === '-1') {
                  vm.tableData.forEach((curr, index, arr) => {
                    if (curr.id === data.id) {
                      arr.splice(index, 1)
                    }
                  })
                } else {
                  vm.deleteChild(data.parentCode, data.id)
                }
              }
            })
          }
        }
      })
    },
    openDialog (dialogRef, row, type) {
      if (type) this.opeType = type
      this.$refs[dialogRef].open(row, type)
    },
    // 获取所有字典项树结构
    async getAllArea (parentCode) {
      const res = await areaApi.getAreaList(parentCode)
      if (res.isSuccess) {
        this.tableData = res.data
      }
    },
    onAdd (data) {
      this.openDialog('areaEdit', data, 'add')
    },
    onUpdate (data) {
      this.openDialog('areaEdit', data, 'edit')
      localStorage.setItem(data.id, JSON.stringify(data))
    },
    async onSubmit () {
      const vm = this
      vm.loading = true
      const {
        id,
        code,
        name,
        fullName,
        parentCode,
        longitude,
        latitude,
        level
      } = vm.form
      let result = null
      const params = {
        code,
        name,
        parentCode,
        fullName,
        longitude,
        latitude,
        level
      }
      if (vm.opeType === 'add') {
        result = await areaApi.addArea(params)
        if (result.isSuccess) {
          if (!vm.currentData.children) {
            vm.$set(vm.currentData, 'children', [])
          }
          vm.currentData.children.push(result.data)
        }
      } else if (vm.opeType === 'edit') {
        result = await areaApi.updatArea({
          id,
          ...params
        })
        if (result.isSuccess) {
          const parent = vm.currentNode.parent
          const children = parent.data.children
          const index = children.findIndex(d => d.id === vm.currentData.id)
          children.splice(index, 1, result.data)
          // vm.currentData = result.data
        }
      }
      if (result.isSuccess) {
        vm.$message.success('保存成功')
        vm.resetForm()
      }
      vm.loading = false
    },
    load (tree, treeNode, resolve) {
      areaApi.getAreaList({ parentCode: tree.code }).then(res => {
        if (res.isSuccess) {
          resolve(res.data)
        }
      })
    },
    refreshChild (key, data, row) {
      const _children = this.$refs['myTable'].store.states.lazyTreeNodeMap[key]
      if (_children) {
        _children.push(data)
      } else {
        this.$refs['myTable'].store.loadOrToggle(row)
      }
    },
    deleteChild (key, data) {
      this.$refs['myTable'].store.states.lazyTreeNodeMap[key].forEach(
        (element, index, arr) => {
          if (element.id === data) {
            arr.splice(index, 1)
          }
        }
      )
    },
    afterCancle (key, data) {
      if (key === '-1') {
        const _data = this.tableData
        _data.forEach((element, index) => {
          if (element.id === data) {
            const _local = JSON.parse(localStorage.getItem(data))
            const _old = _data[index]
            Reflect.ownKeys(_old).forEach(current => {
              if (_old[current] !== _local[current]) {
                _old[current] = _local[current]
              }
            })
            localStorage.removeItem(data)
          }
        })
      } else {
        this.$refs['myTable'].store.states.lazyTreeNodeMap[key].forEach(
          (element, index, arr) => {
            if (element.id === data) {
              const _data = JSON.parse(localStorage.getItem(data))
              const _old = arr[index]
              Reflect.ownKeys(_old).forEach(current => {
                if (_old[current] !== _data[current]) {
                  _old[current] = _data[current]
                }
              })
              localStorage.removeItem(data)
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .menu-manage {
  height: 100%;
  display: flex;

    .el-card {
    min-height: 100%;
  }

    .tree-area {
    min-width: 300px;
    max-width: 300px;
  }

    .edit-area {
    flex-grow: 1;
    max-width: 880px;
    padding-left: 10px;

      .form-group {
      width: 400px;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
