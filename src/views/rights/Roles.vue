<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" plain @click="addrolesform=true">添加按钮</el-button>
        <template>
            <el-table :data="tableData" border style="margin-top:15px; width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="first in scope.row.children" :key="first.id" style="margin-bottom:10px">
                            <el-col :span="4">
                                <el-tag closable type="success" @close='deleteUseright(scope.row,first.id)'>{{first.authName}}</el-tag>
                            </el-col>
                            <el-col :span="20">
                                <el-row v-for="second in first.children" :key="second.id">
                                    <el-col :span="4">
                                        <el-tag closable type="warning" @close='deleteUseright(scope.row,second.id)'>{{second.authName}}</el-tag>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-tag closable type="info" v-for="item in second.children" :key="item.id" style="margin-right:10px;margin-bottom:10px" @close='deleteUseright(scope.row,item.id)'>{{item.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row v-if="scope.row.children.length===0">该角色没有任何权限</el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="400">
                </el-table-column>
                <el-table-column prop="roleDesc" label="描述" width="400">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
                            <el-button type="primary" plain icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button type="primary" plain icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="授权角色" placement="right-end">
                            <el-button type="primary" plain icon="el-icon-check" @click='rolesList(scope.row)'> </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!-- 树形 -->
        <el-dialog title="授权角色" :visible.sync="RoleseShow">
            <div style="height:400px;overflow:auto">
                <el-tree :data="data2" ref="tree" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="rolesKey" :props="defaultProps">
                </el-tree>
            </div>
             <div slot="footer" class="dialog-footer">
        <el-button @click="RoleseShow  = false">取 消</el-button>
        <el-button type="primary" @click='Rolesrights'>确 定</el-button>
      </div>
        </el-dialog>

        <!-- 添加用户 -->
        <el-dialog title="添加角色" :visible.sync="addrolesform">
      <el-form :model="addform" :rules='rules' ref='addForm'>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop='roleName'>
          <el-input v-model="addform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop='roleDesc'>
          <el-input v-model="addform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addrolesform = false">取 消</el-button>
        <el-button type="primary" @click="sureRoles">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>

import {
  setRolesuesrlist,
  deleteUserrights,
  getRoleRightlist,
  upadteUserrole,
  addRoles
} from '@/api/index.js'
export default {
  data () {
    return {
      formLabelWidth: '100px',
      addform: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称', trigger: 'blur' }
        ],
        roleDesc: [{}]
      },
      addrolesform: false,
      rolesId: '',
      rolesKey: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      RoleseShow: false,
      data2: [],
      tableData: []
    }
  },
  mounted () {
    setRolesuesrlist().then(res => {
      //   console.log(res)
      if (res.meta.status === 200) {
        this.tableData = res.data
      }
    })
  },
  methods: {
    sureRoles () {
      addRoles(this.addform).then((res) => {
        console.log(res)
        if (res.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
        this.addrolesform = false
      })
    },
    Rolesrights () {
    //   console.log(this.$refs.tree.getCheckedNodes())
      var oneArr = this.$refs.tree.getCheckedNodes()
      var idArr = oneArr.map((val) => {
        return val.id + ',' + val.pid
      })
      //   console.log(idArr)
      var strArr = idArr.join(',')
      //   console.log(strArr)
      var newArr = strArr.split(',')
      //   console.log(newArr)
      let setArr = new Set(newArr)
      let array = Array.from(setArr)
      //   console.log(array)
      var ridArr = array.join(',')
      //   console.log(ridArr)
      upadteUserrole({roleid: this.rolesId, rids: ridArr}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
        this.RoleseShow = false
        setRolesuesrlist().then(res => {
          //   console.log(res)
          if (res.meta.status === 200) {
            this.tableData = res.data
          }
        })
      })
    },
    rolesList (row) {
      this.rolesId = row.id
      console.log(row.id)
      this.RoleseShow = true
      getRoleRightlist('tree').then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.data2 = res.data
        }
      })
      //   console.log(row)
      this.rolesKey = []
      if (row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children.length > 0) {
                second.children.forEach(val => {
                  this.rolesKey.push(val.id)
                })
              }
            })
          }
        })
      }
    },
    deleteUseright (row, rightId) {
      deleteUserrights(row.id, rightId).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          row.children = res.data
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
</style>
