const Layout = import('@/layout/index.vue')
const UserList = import('@/views/user/index.vue')
const AddUser = import('@/views/user/add.vue')

export default [
  {
    path: '/user',
    component: Layout,
    name: 'user-manage',
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/user/list',
        name: 'userList',
        component: UserList,
        meta: {
          title: '用户列表',
          breadcrumb: ['用户管理', '用户列表']
        }
      },
      {
        path: '/user/add',
        name: 'addUser',
        component: AddUser,
        meta: {
          title: '添加用户',
          breadcrumb: ['用户管理', '添加用户']
        },
        hidden: true
      }
    ]
  }
]