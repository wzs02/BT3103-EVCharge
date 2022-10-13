import { createRouter, createWebHashHistory } from "vue-router"
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LogIn
    },
    {
        path: '/signup',
        name:'SignUp',
        component:SignUp
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router