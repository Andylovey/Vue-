<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top:15px; ">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:320px" @keyup.native.enter='search'>
        <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
      </el-input>
      <el-button type="success" :plain='true' @click='dialogaddVisible = true'>添加用户</el-button>
    </div>
    <template>
      <el-table :data="tableData" border style="margin-top:15px; width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change='setUserstate(scope.row)'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
              <el-button type="primary" plain icon="el-icon-edit" @click='edituser(scope.row)'></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="primary" plain icon="el-icon-delete" @click="deleteuser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="授权角色" placement="right-end">
              <el-button type="primary" plain icon="el-icon-check" @click='setrole(scope.row)'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block" style="background-color:#d6d2d2; margin-top:15px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10,20,30,40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogupdateVisible">
      <el-form :model="update" :rules='rules' ref='updateForm'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="update.username" auto-complete="off" disabled=''></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="update.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
          <el-input v-model="update.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateuser('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogaddVisible">
      <el-form :model="add" :rules='rules' ref='addForm'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="add.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
          <el-input v-model="add.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="add.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop='mobile'>
          <el-input v-model="add.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addusersure('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 授权角色 -->
    <el-dialog title="授权角色" :visible.sync="dialogroleVisible">
      <el-form :model="role">
        <el-form-item label="用户名" :label-width='formLabelWidth'>
          <el-input v-model="role.username" auto-complete="off" disabled='' style='width:200px'></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width='formLabelWidth'>
          <template>
          <el-select v-model="role.rid" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
           </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogroleVisible  = false">取 消</el-button>
        <el-button type="primary" @click="sureRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserlist, deleteUser, appUser, updateUser, getRolelist, setRoleuser, setUserliststate } from '@/api/index.js'
export default {
  data () {
    return {
      options: [],
      value: '',
      input5: '',
      tableData: [],
      currentPage4: 4,
      total: 0,
      pagesize: 10,
      pagenum: 1,
      dialogupdateVisible: false,
      dialogaddVisible: false,
      dialogroleVisible: false,
      role: {
        username: '',
        id: '',
        rid: ''
      },
      update: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      add: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [{ required: true, message: '电话不能为空' }]
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 修改用户状态
    setUserstate (row) {
      // console.log(row)
      setUserliststate(row.id, row.mg_state).then((res) => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    // 授权角色
    sureRole () {
      setRoleuser(this.role).then((res) => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      this.dialogroleVisible = false
    },
    // 角色数据获取
    setrole (row) {
      this.dialogroleVisible = true
      this.role.username = row.username
      this.role.id = row.id
      getRolelist().then((res) => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.options = res.data
        }
      })
    },
    // 查询
    search () {
      this.initList()
    },
    initList () {
      getUserlist({
        query: this.input5,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        this.tableData = res.data.users
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.pagenum = val
      this.initList()
    },
    // 删除操作
    deleteuser (row) {
      console.log(123)
      this.$confirm('此操作将永久删除id号为' + row.id + '的用户数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(row.id).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击编辑显示表格并显示数据
    edituser (row) {
      this.dialogupdateVisible = true
      this.update.username = row.username
      this.update.email = row.email
      this.update.mobile = row.mobile
      this.update.id = row.id
    },
    // 点击确定发送请求
    updateuser (updateForm) {
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          updateUser(this.update).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.initList()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error'
          })
        }
      })
      this.dialogupdateVisible = false
    },
    // 点击添加确定发送请求
    addusersure (add) {
      this.$refs[add].validate(valid => {
        if (valid) {
          appUser(this.add).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.dialogaddVisible = false
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.initList()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('验证失败')
        }
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
.user {
  .search-input {
    width: 300px;
  }
}
</style>
