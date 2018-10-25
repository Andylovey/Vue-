import Vue from 'vue'
import Vuex from 'vuex'

// 让vue使用vuex工具来实现组件之间的数据共享
Vue.use(Vuex)

// 存储数据的对象，我们可以将你需要存储的数据在这个state中定义
const state = {
  // 当前登陆的用户名
  username: ''
}
const mutations = {
  setUsername (state, username) {
    state.username = username
    localStorage.setItem('myname', username)
  },
  getUsername (state) {
    return state.username
  }
}
const actions = {
  setcommit: ({ commit }, username) => {
    commit('setUsername', username)
  },
  getcommit: ({ commit }) => {
    commit('getUsername')
  }
}
const getters = {
  getmyname () {
    return localStorage.getItem('myname')
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  getters,
  actions,
  mutations
})
