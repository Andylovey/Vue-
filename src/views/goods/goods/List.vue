<template>
  <div>
     <div style="margin-top:15px; ">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:320px" @keyup.native.enter='search'>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" :plain='true' @click='$router.push({path:"add"})'>添加用户</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input5: ''
    }
  }
}
</script>

<style scoped>

</style>
