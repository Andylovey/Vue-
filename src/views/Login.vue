<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt="" class="avatar">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop='username'>
          <el-input v-model="loginForm.username" prefix-icon='myicon myicon-user'></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="loginForm.password" type='password' prefix-icon='myicon myicon-key'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getUserlist } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              // this.$store.state.username = res.data.username
              localStorage.setItem('mytoken', res.data.token)
              this.$store.dispatch('setcommit', res.data.username)
              getUserlist({query: '', pagenum: 1, pagesize: 10}).then((res) => {
                console.log(res)
              })
              this.$router.push({name: 'Home'})
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;

    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
