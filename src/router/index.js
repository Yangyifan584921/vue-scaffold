import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = import('@/layout/index.vue')

const path = require('path')
const files = require.context('./modules', false, /\.js$/)
let modules = []
files.keys().forEach(key => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

// 全部菜单
let allMenus = []
for(let key in modules) {
  allMenus = [...allMenus, ...modules[key]]
}

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '首页',
          breadcrumb: ['首页']
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginRegister.vue'),
    name: 'login',
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    // 如果直接写成*,会报错
    path: '/:catchAll(.*)',
    component: () => import('@/views/404.vue'),
    name: '/404',
    hidden: true
  },
  ...allMenus
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router