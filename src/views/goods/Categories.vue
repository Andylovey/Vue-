<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click='showadddialogFormVisible'>添加按钮</el-button>

    <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
    </tree-grid>

    <!-- 添加 -->
    <el-dialog title="添加分类" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
            <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props="cascaderProps">
            </el-cascader>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getGoodslist, getGoodscategories } from '@/api/index.js'
export default {
  data () {
    return {
      selectedOptions: [],
      options: [],
      addform: {
        cat_name: '',
        cat_pid: '',
        cat_level: ''
      },
      adddialogFormVisible: false,
      dataSource: [],
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      cascaderProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      }
    }
  },
  mounted () {
    getGoodslist(3).then(res => {
      // console.log(res)
      this.dataSource = res.data
    })
  },
  components: {
    'tree-grid': TreeGrid
  },
  // 当级联发生改变时出发
  methods: {
    // 点击确认添加
    sureAdd () {
      if (this.selectedOptions.length === 0) {
        this.addform.cat_level = 0
        this.addform.cat_pid = 0
      } else if (this.selectedOptions.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = this.selectedOptions[0]
      } else if (this.selectedOptions.length === 2) {
        this.addform.cat_level = 2
        this.addform.cat_pid = this.selectedOptions[1]
      }
      getGoodscategories(this.addform).then((res) => {
        console.log(res)
        if (res.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
      getGoodslist(3).then(res => {
      // console.log(res)
        this.dataSource = res.data
      })
      this.adddialogFormVisible = false
    },
    handleChange (value) {
    },

    // 删除
    deleteCategory (cid) {
      // console.log(cid)
    },
    // 编辑
    editCategory (cid) {
      // console.log(cid)
    },
    // 点击添加
    showadddialogFormVisible () {
      this.adddialogFormVisible = true
      getGoodslist(2).then(res => {
        // console.log(res)
        this.options = res.data
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>
