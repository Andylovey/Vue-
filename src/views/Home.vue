<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu :collapse='iscollapse' :router='true' :unique-opened='true' class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu :index="item.id+''" v-for="item in menusform" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                            <el-menu-item :index="'/'+Subitem.path" v-for="Subitem in item.children " :key="Subitem.id">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{Subitem.authName}}</span>
                            </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <span class="myicon myicon-menu toggle-btn" @click='iscollapse=!iscollapse'></span>
                    <span class="system-title">电商后台管理系统</span>
                    <div>
                        <span class="welcome">你好{{this.$store.getters.getmyname}}</span>
                        <el-button type="text" @click='out'>退出</el-button>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { getLeftmenus } from '@/api/index.js'
export default {
  data () {
    return {
      iscollapse: false,
      menusform: []
    }
  },
  mounted () {
    getLeftmenus().then((res) => {
      console.log(res)
      this.menusform = res.data
    })
  },
  methods: {
    out () {
      localStorage.removeItem('mytoken')
      this.$router.push({name: 'Login'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    .myicon{
      float: left;
    }
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
