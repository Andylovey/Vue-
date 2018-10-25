<template>
  <div>
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-form v-model="addform" label-width="80px">
      <template>
        <el-tabs v-model="activeName" tab-position='left'>
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称">
              <el-input v-model="addform.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="addform.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="addform.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="addform.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader :options="options" v-model="selectedOptions" :props="showdata" @change='getgoods_cat'>
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2">

          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" :on-success='uploadsuccess' :headers='gettoken()' list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <template>
            <quill-editor v-model="addform.goods_introduce" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style='height:200px;border-bottom:1px solid #333'>
            </quill-editor>
            </template>
          </el-tab-pane>
        </el-tabs>
         <el-button type="success" class="addBtn" @click='addGoodsSubmit'>添加商品</el-button>
      </template>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
        <img :src="src" alt="">
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { getGoodslist, addGoods } from '@/api/index.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block']
          ]
        }
      },
      showdata: {
        value: 'cat_id',
        children: 'children',
        label: 'cat_name'
      },
      selectedOptions: [],
      options: [],
      src: '',
      dialogVisible: false,
      addform: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      activeName: '',
      fileList2: []
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    getGoodslist(3).then(res => {
      this.options = res.data
    })
  },
  methods: {
    addGoodsSubmit () {
      addGoods(this.addform).then(res => {
        // console.log(res)
        if (res.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    getgoods_cat () {
      this.addform.goods_cat = this.selectedOptions.join(',')
    },
    gettoken () {
      var token = localStorage.getItem('mytoken')
      return { Authorization: token }
    },
    uploadsuccess (response, file, fileList) {
      this.addform.pics.push({ pic: response.data.tmp_path })
    },
    // 删除
    handleRemove (file, fileList) {
      var ret = this.addform.pics.findIndex(value => {
        return value.pic === file.response.data.tmp_path
      })
      this.addform.pics.splice(ret, 1)
    },
    // 点击渲染
    handlePreview (file) {
      this.src = 'http://localhost:8888/' + file.response.data.tmp_path
      this.dialogVisible = true
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }
}
</script>

<style scoped>
.addBtn {
  float: right;
  margin: 20px 0px;
}
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
