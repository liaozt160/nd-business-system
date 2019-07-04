import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 管理员路由
export const asyncRoutes = [
  {
    path: '/userManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/userManagement/index'),
        name: 'userManagement',
        meta: { title: 'userManagement', icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/orderManagement'),
        name: 'orderManagement',
        meta: { title: 'orderManagement', icon: 'order', noCache: true }
      }
    ]
  },
  {
    path: '/buyers',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/buyers'),
        name: 'buyers',
        meta: { title: 'buyers', icon: 'gerenpay', noCache: true }
      }
    ]
  },
  {
    path: '/buyerOrder',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/buyerOrder/buyerOrder'),
        name: 'buyerOrder',
        hidden: true,
        meta: { title: 'buyerOrder', icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/businessForSales',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessForSales/businessForSales'),
        name: 'businessForSales',
        meta: { title: 'businessForSales', icon: 'daishou', noCache: true }
      }
    ]
  },
  {
    path: '/employerEdit',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessForSales/employerEdit/employerEdit'),
        name: 'employerEdit',
        hidden: true,
        meta: { title: 'employerEdit', icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/attentionBusiness',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/attentionBusiness'),
        name: 'attentionBusiness',
        meta: { title: 'attentionBusiness', icon: 'recommend', noCache: true }
      }
    ]
  },
  {
    path: '/businessBrokerNet',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessBrokerNet/businessBrokerNet'),
        name: 'businessBrokerNet',
        meta: { title: 'businessBrokerNet', icon: 'net', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,


  { path: '*', redirect: '/404', hidden: true }
];
// 买家中介路由
export const buyerRoutes = [
  {
    path: '/buyers',
    component: Layout,
    children: [
      {
        path: 'buyers',
        component: () => import('@/views/buyers/buyers'),
        name: 'buyers',
        meta: { title: 'buyers', icon: 'gerenpay', noCache: true }
      }
    ]
  },
  {
    path: '/buyerOrder',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/buyerOrder/buyerOrder'),
        name: 'buyerOrder',
        hidden: true,
        meta: { title: 'buyerOrder', icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/attentionBusiness',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/attentionBusiness'),
        name: 'attentionBusiness',
        meta: { title: 'attentionBusiness', icon: 'daishou', noCache: true }
      }
    ]
  },
  {
    path: '/businessForSalesLevelOne',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyers/businessForSalesLevelOne'),
        name: 'businessForSalesLevelOne',
        meta: { title: 'businessForSales', icon: 'daishou', noCache: true }
      }
    ]
  },
  // {
  //   path: '/businessForSalesLevelTwo',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/buyers/businessForSalesLevelTwo'),
  //       name: 'businessForSalesLevelTwo',
  //       meta: { title: 'MoreBusinessInformation', icon: 'daishou', noCache: true }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
];
// 卖家中介路由
export const businessRoutes = [
  {
    path: '/businessForSales',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessForSales/businessForSales'),
        name: 'businessForSales',
        meta: { title: 'myBusiness', icon: 'daishou', noCache: true }
      }
    ]
  },
  {
    path: '/employerEdit',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/businessForSales/employerEdit/employerEdit'),
        name: 'employerEdit',
        hidden: true,
        meta: { title: 'employerEdit', icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/AttentionBuyers',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/AttentionBuyers/AttentionBuyers'),
        name: 'AttentionBuyers',
        meta: { title: 'AttentionBuyers', icon: 'gerenpay', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router
