import Home from '@/Home'
import store from '@/store'
import { getToken } from '@/request/token'
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err=>err)
}


const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: '/write/:id?',
            component: r => require.ensure([], () => r(require('@/views/blog/blogWrite')), 'blogwrite'),
            meta: {
            requireLogin: true
            },
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/',
                    component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
                },
                {
                    path: '/messageBoard',
                    component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
                },
                {
                    path: '/categorys',
                    component: r => require.ensure([], () => r(require('@/views/blog/blogCategorys')), 'categorys')
                },
                {
                    path: '/tags',
                    component: r => require.ensure([], () => r(require('@/views/blog/blogTags')), 'tags')
                },
                {
                    path: '/archive',
                    component: r => require.ensure([], () => r(require('@/views/blog/blogArchive')), 'blogArchive')
                },
                {
                    path: '/friend',
                    component: r => require.ensure([], () => r(require('@/views/Friend')), 'friend')
                },
                {
                    path: '/view/:id',
                    component: r => require.ensure([], () => r(require('@/views/blog/blogView')), 'blogview')
                },
                {
                path: '/:type/:id',
                component: r => require.ensure([], () => r(require('@/views/blog/blogCategoryTag')), 'blogcategorytag')
                },
                {
                    path: '/aboutme',
                    component: r => require.ensure([], () => r(require('@/views/blog/blogMe')), 'aboutme')
                }
            ]
        },
        {
            path: '/login',
            component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
        },
        {
            path: '/updatepassword',
            component: r => require.ensure([], () => r(require('@/views/UpdatePassword')), 'updatepassword')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})


router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/write') {
            if (store.state.id != 1) {
                next({ path: '/login' })
            } else {
                next()
            }
        }

        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (store.state.account.length === 0) {
                store.dispatch('getUserInfo').then(data => { //获取用户信息
                    next()
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        showClose: true,
                        message: '登录已过期'
                    })
                    next({ path: '/' })
                })
            } else {
                next()
            }
        }
    } else {
        if (to.matched.some(r => r.meta.requireLogin)) {
            this.$message({
                type: 'warning',
                showClose: true,
                message: '请先登录哦'
            })

        } else {
            next();
        }
    }
})


export default router