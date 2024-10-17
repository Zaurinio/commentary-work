import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import Testimonials from '../views/Testimonials.vue'
import Contact from '../views/Contact.vue'
import Auth from '../views/Auth.vue'

const routes = [
    {
        path: '/',
        redirect: { name: 'projects' },
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
    },
    {
        path: '/testimonials',
        name: 'testimonials',
        component: Testimonials,

    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.name === 'auth' && authStore.userInfo.token) {
        next('/projects')
    } else {
        next()
    }
})


export default router