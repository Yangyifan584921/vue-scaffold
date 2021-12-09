const Layout = import('@/layout/index.vue')
const ProductList = import('@/views/product/index.vue')

export default [
  {
    path: '/products',
    component: Layout,
    name: 'products-manage',
    meta: {
      title: '产品管理'
    },
    redirect: '/products/list',
    children: [
      {
        path: '/products/list',
        name: 'productsList',
        component: ProductList,
        meta: {
          title: '产品管理',
          breadcrumb: ['入库管理', '入库记录']
        }
      }
    ]
  }
]