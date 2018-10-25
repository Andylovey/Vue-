import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/user/User.vue'
import Roles from '../views/rights/Roles.vue'
import Rights from '../views/rights/Rights.vue'
import Goods from '../views/goods/Goods.vue'
import Categories from '../views/goods/Categories.vue'
import Params from '../views/goods/Params.vue'
import Add from '../views/goods/goods/Add.vue'
import List from '../views/goods/goods/List.vue'
import Reports from '../views/reports/Reports.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/reports',
          name: 'Reports',
          component: Reports
        },
        {
          path: 'users',
          name: 'User',
          component: User
        },
        {
          path: 'Roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: 'Rights',
          name: 'Rights',
          component: Rights
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          redirect: {path: 'goods/list'},
          children: [
            {
              path: 'add',
              name: 'Add',
              component: Add
            },
            {
              path: 'list',
              name: 'List',
              component: List
            }
          ]
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: 'params',
          name: 'Params',
          component: Params
        }
      ]
    }
  ]
})
