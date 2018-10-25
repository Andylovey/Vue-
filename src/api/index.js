import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
// 设置默认的基准路径
axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function (config) {
  var token = localStorage.getItem('mytoken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export const login = (obj) => {
  return axios.post('login', obj).then((res) => {
    return res.data
  })
}

export const getUserlist = (params) => {
  return axios.get('users', {params: params}).then((res) => {
    return res.data
  })
}

export const deleteUser = (id) => {
  return axios.delete('users/' + id).then((res) => {
    return res
  })
}

export const appUser = (pa) => {
  return axios.post('users', pa).then((res) => {
    return res.data
  })
}

export const updateUser = (pa) => {
  console.log(pa.id)
  return axios.put(`users/${pa.id}`, pa).then((res) => {
    return res.data
  })
}

export const getRolelist = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}

export const setRoleuser = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid}).then((res) => {
    return res.data
  })
}

export const setUserliststate = (id, state) => {
  return axios.put(`users/${id}/state/${state}`).then((res) => {
    return res.data
  })
}

export const setRolesuesrlist = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}

export const getRoleRightlist = (type) => {
  return axios.get(`rights/${type}`).then((res) => {
    return res.data
  })
}

export const deleteUserrights = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`).then((res) => {
    return res.data
  })
}

export const upadteUserrole = (pa) => {
  return axios.post(`roles/${pa.roleid}/rights`, {rids: pa.rids}).then((res) => {
    return res.data
  })
}

export const getLeftmenus = () => {
  return axios.get('menus').then((res) => {
    return res.data
  })
}

export const addRoles = (pa) => {
  return axios.post('roles', pa).then((res) => {
    return res.data
  })
}

export const getGoodslist = (type) => {
  return axios.get('categories', {params: {'type': type}}).then((res) => {
    return res.data
  })
}

export const getGoodscategories = (pa) => {
  return axios.post('categories', pa).then((res) => {
    return res.data
  })
}

export const Goodslist = (pa) => {
  return axios.get('goods', {params: pa}).then((res) => {
    return res.data
  })
}

export const addGoods = (pa) => {
  return axios.post('goods', pa).then((res) => {
    return res.data
  })
}
